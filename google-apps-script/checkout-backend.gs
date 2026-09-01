/**
 * IPTV Turkey — order intake
 *
 * Appends one row per order to the "IPTV Turkey - commandes" sheet.
 *
 * ── If testAppend says "Execution completed" but no row appears ───────────
 * The script wrote to a different spreadsheet. Run `diagnose()` and read the
 * Execution log: it prints the name and URL of the file it is actually using.
 * Then paste that spreadsheet's ID into SPREADSHEET_ID below.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Setup
 * 1. Paste this over Code.gs and Save.
 * 2. Run `diagnose()` once and approve the permission prompt.
 * 3. Deploy -> New deployment -> Web app
 *      Execute as     : Me
 *      Who has access : Anyone
 * 4. Put the /exec URL in NEXT_PUBLIC_ORDER_ENDPOINT on Vercel.
 *
 * After ANY edit here: Deploy -> Manage deployments -> Edit (pencil) ->
 * Version: New version -> Deploy. Saving alone keeps the old code live.
 */

/**
 * The spreadsheet to write to.
 *
 * Leave '' to use the spreadsheet this script is attached to. That only works
 * for a bound script (opened via Extensions -> Apps Script from inside the
 * sheet). For a standalone script, paste the ID here.
 *
 * The ID is the long part of the sheet URL:
 *   https://docs.google.com/spreadsheets/d/THIS_PART_HERE/edit
 */
var SPREADSHEET_ID = '1IQ3yAqE_sjlsM9Fdd7rBaIdJ69hGQXzYwtg-J7WFJ4o';

/** Tab name. Leave '' to use the first tab, whatever it is called. */
var SHEET_NAME = '';

/**
 * Where to send the "new order" alert. Leave '' to disable email alerts.
 * Free Gmail accounts can send about 100 mails a day, which is far more than
 * this will ever use.
 */
var NOTIFY_EMAIL = 'xyz905391@gmail.com';

/** Shown in the alert subject and in the Website row. */
var SITE_NAME = 'www.iptv-turkey.site';

/** Currency symbol used in the alert. */
var CURRENCY = '\u20AC';

var HEADERS = [
  'Date',
  'Nom',
  'Email',
  'Téléphone',
  'Formule',
  'Prix (€)',
  'Connexions',
  'Paiement',
  'Statut'
];

/* -- Web app ------------------------------------------------------------ */

/** Writes one order and sends the alert. Shared by doPost and doGet. */
function handleOrder(payload) {
  var sheet = getSheet();
    sheet.appendRow([
      new Date(),
      payload.name || '',
      payload.email || '',
      payload.phone || '',
      payload.plan || '',
      payload.total || '',
      payload.connections || '',
      'En attente',
      'Nouvelle'
    ]);

  // Alert is best-effort: the row is already saved, so a mail failure must
  // not turn into an error for the customer.
  try {
    notify(payload, sheet);
  } catch (mailErr) {
    Logger.log('Notification failed: ' + mailErr);
  }

  return sheet.getLastRow();
}

function doPost(e) {
  try {
    var row = handleOrder(JSON.parse(e.postData.contents));
    return json({ ok: true, row: row });
  } catch (err) {
    // Never throw: a failure here must not block the customer's order.
    Logger.log('doPost failed: ' + err);
    return json({ ok: false, error: String(err) });
  }
}

/**
 * Handles orders sent as query parameters, and doubles as a health check.
 *
 * The website uses GET because an Apps Script /exec POST is answered with a
 * 302 to googleusercontent.com, and browsers drop the request body when
 * following that redirect — the request appears to succeed while nothing is
 * written. A GET survives the redirect intact.
 *
 * It also means you can test everything by pasting a URL into a browser:
 *   <your /exec url>?name=Test&email=a@b.com&plan=Gold&total=49.99
 */
function doGet(e) {
  var p = (e && e.parameter) || {};

  if (!p.name && !p.email && !p.plan) {
    return json({ ok: true, service: 'IPTV Turkey order intake' });
  }

  try {
    var row = handleOrder({
      name: p.name,
      email: p.email,
      phone: p.phone,
      country: p.country,
      plan: p.plan,
      months: p.months,
      paidMonths: p.paidMonths,
      bonusMonths: p.bonusMonths,
      connections: p.connections,
      total: p.total
    });
    return json({ ok: true, row: row });
  } catch (err) {
    Logger.log('doGet failed: ' + err);
    return json({ ok: false, error: String(err) });
  }
}

/* -- Helpers ------------------------------------------------------------ */

function getSpreadsheet() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      'No active spreadsheet. This script is standalone - set SPREADSHEET_ID.'
    );
  }
  return ss;
}

function getSheet() {
  var ss = getSpreadsheet();
  var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];

  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found in ' + ss.getName());
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/* -- Notification ------------------------------------------------------- */

/** Escapes text before it goes into the HTML table. */
function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label, valueHtml) {
  return (
    '<tr>' +
    '<th align="left" style="padding:10px 14px;border:1px solid #e3e3e3;' +
    'background:#f7f7f7;font:600 14px system-ui,sans-serif;white-space:nowrap">' +
    esc(label) +
    '</th>' +
    '<td style="padding:10px 14px;border:1px solid #e3e3e3;' +
    'font:14px system-ui,sans-serif">' +
    (valueHtml || '') +
    '</td></tr>'
  );
}

/** Emails a formatted summary of one order. Called by doPost and testNotify. */
function notify(payload, sheet) {
  if (!NOTIFY_EMAIL) return;

  var plan = payload.plan || '-';
  var name = payload.name || '-';
  var total = (payload.total != null ? payload.total : '-') + ' ' + CURRENCY;

  // Duration reads "18 months (15 + 3 free)" when a bonus applies.
  var duration = payload.months ? payload.months + ' ay' : '-';
  if (payload.paidMonths && payload.bonusMonths) {
    duration += ' (' + payload.paidMonths + ' + ' + payload.bonusMonths + ' hediye)';
  }

  var email = payload.email
    ? '<a href="mailto:' + esc(payload.email) + '">' + esc(payload.email) + '</a>'
    : '-';

  var phoneDigits = String(payload.phone || '').replace(/[^0-9]/g, '');
  var phone = payload.phone
    ? '<a href="https://wa.me/' + phoneDigits + '">' + esc(payload.phone) + '</a>'
    : '-';

  var sheetUrl = sheet ? sheet.getParent().getUrl() : '';

  var html =
    '<div style="font:14px system-ui,sans-serif;color:#111">' +
    '<h2 style="font-size:20px;margin:0 0 16px">New order &mdash; ' +
    esc(SITE_NAME) +
    '</h2>' +
    '<table cellspacing="0" cellpadding="0" style="border-collapse:collapse">' +
    row('Website', esc(SITE_NAME)) +
    row('Name', esc(name)) +
    row('Email', email) +
    row('Phone', phone) +
    row('Country', esc(payload.country || '-')) +
    row('Plan', esc(plan)) +
    row('Duration', esc(duration)) +
    row('Connections', esc(payload.connections || '-')) +
    row('Total', '<strong>' + esc(total) + '</strong>') +
    row('Payment method', 'WhatsApp') +
    row('Received', esc(new Date().toString())) +
    (sheetUrl
      ? row('Sheet', '<a href="' + esc(sheetUrl) + '">Open row ' + esc(sheet.getLastRow()) + '</a>')
      : '') +
    '</table></div>';

  // Plain-text fallback for clients that do not render HTML.
  var text = [
    'New order - ' + SITE_NAME,
    '',
    'Name        : ' + name,
    'Email       : ' + (payload.email || '-'),
    'Phone       : ' + (payload.phone || '-'),
    'Country     : ' + (payload.country || '-'),
    'Plan        : ' + plan,
    'Duration    : ' + duration,
    'Connections : ' + (payload.connections || '-'),
    'Total       : ' + total,
    'Received    : ' + new Date().toString()
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject:
      'New order [' + SITE_NAME + '] : ' + plan + ' \u2014 ' + total + ' (' + name + ')',
    body: text,
    htmlBody: html,
    name: 'IPTV Turkey'
  });
}

/* -- Diagnostics -------------------------------------------------------- */

/**
 * Prints which spreadsheet and tab this script is writing to.
 * Run this first when rows are not appearing where you expect.
 */
function diagnose() {
  var ss;
  try {
    ss = getSpreadsheet();
  } catch (err) {
    Logger.log('FAILED: ' + err);
    Logger.log('This script is not attached to a spreadsheet.');
    Logger.log('Fix: open your sheet -> Extensions -> Apps Script, or set');
    Logger.log('SPREADSHEET_ID to the id from your spreadsheet URL.');
    return;
  }

  Logger.log('Writing to : ' + ss.getName());
  Logger.log('URL        : ' + ss.getUrl());
  Logger.log(
    'Tabs       : ' +
      ss
        .getSheets()
        .map(function (s) {
          return s.getName() + ' (' + s.getLastRow() + ' rows)';
        })
        .join(', ')
  );

  var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
  Logger.log('Target tab : ' + (sheet ? sheet.getName() : 'NOT FOUND'));
  Logger.log('');
  Logger.log('If the name or URL above is not your orders sheet, that is the bug.');
}

/** Writes one test row, then reports exactly where it went. */
function testAppend() {
  var sheet = getSheet();

  sheet.appendRow([
    new Date(),
    'Test Musteri',
    'test@example.com',
    '+90 5321234567',
    'Gold',
    49.99,
    1,
    'En attente',
    'Test'
  ]);

  Logger.log(
    'Row written to : ' + sheet.getParent().getName() + ' -> ' + sheet.getName()
  );
  Logger.log('Open this file : ' + sheet.getParent().getUrl());
  Logger.log('Row number     : ' + sheet.getLastRow());
}

/** Sends one test alert, so you can confirm mail delivery on its own. */
function testNotify() {
  notify(
    {
      name: 'Test Musteri',
      email: 'test@example.com',
      phone: '+90 5321234567',
      country: 'Turkiye',
      plan: 'Gold',
      months: 18,
      paidMonths: 15,
      bonusMonths: 3,
      connections: 2,
      total: 92.48
    },
    getSheet()
  );
  Logger.log('Alert sent to: ' + NOTIFY_EMAIL);
  Logger.log('Check the inbox, and the spam folder on the first send.');
}

/**
 * Simulates a website order without touching the site.
 * If this adds a row, the sheet side is fine and any remaining problem is the
 * deployment URL or its access setting.
 */
function testWebhook() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Webhook Test',
        email: 'webhook@example.com',
        phone: '+90 5559998877',
        plan: 'Exclusive',
        total: 84.99,
        connections: 3
      })
    }
  });
  Logger.log('doPost returned: ' + res.getContent());
}
