# REQ-003 investigation

Date: 2026-11-15.

REQ-003 status was not changed. This note does not mark it Pass.

## Acceptance criteria

From `docs/FINAL_REQUIREMENT_TRACEABILITY.md`:

Confirm the demo site's terms before automated capture.

The earlier note `docs/evidence/REQ-003-demo-terms-check.md` inspected the login page in a separate browser and found no terms link. That check has no REA evidence ID.

## What was inspected with REA

`list_browser_targets` evidence `ev_4aa6a47383234d8bfeba934cc400291fe4dc1fbff874a8c1bb8dda3818b0c515` on `http://127.0.0.1:9222`, limited to `https://opensource-demo.orangehrmlive.com`. Two pages were open:

| Target | URL |
|---|---|
| `500613AB6A376D6B70C8B177B1C2FA00` | `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewDefinedPredefinedReports` |
| `2B1B4CE4B6DFA5E5A9C64AA3436550C5` | `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList` |

The login page was not an open target. No navigation, click, login, or form submission was performed.

### Reports page

Passive `inspect_web_page` evidence `ev_0fd8a3c26799ec25c4bcbff45afe2cad6e29dc39396bef5334d4c7a7519307d0`. Title `OrangeHRM`. Accessibility text was included. Script sources, storage, console text, and body shapes were not requested.

Named links: `OrangeHRM, Inc`, `client brand banner`, `Upgrade`, `Admin`, `PIM`, `Leave`, `Time`, `Recruitment`, `My Info`, `Performance`, `Dashboard`, `Directory`, `Maintenance`, `Claim`, `Buzz`, `Employee List`, `Add Employee`, `Reports`.

Retained same-origin hrefs are module routes, the reports page hash links, stylesheets, and scripts. No retained href contains a terms, privacy, or site-rules path. The words "terms of use", "privacy policy", "acceptable use", and "site rules" do not appear. Three hrefs were recorded as `outside_policy` with a null URL, so their destinations were not kept. One of those anchors has the accessible name `OrangeHRM, Inc`. The other two correspond to the brand banner and the Upgrade control. None of those accessible names is Terms.

### Employee List page

A new passive inspect was attempted twice, with `command_timeout_ms` 20000 and then 60000. Both failed: CDP `Page.enable` exceeded the command deadline. No evidence ID was returned for that attempt.

A retained earlier inspect of the same URL is `ev_08220b53ab7d5f458edacde3f613a4406f08689ea7b8121045d075f87ee14756`. Its named links match the Reports list above. Its retained hrefs are the same module routes plus employee-list hash links. Three hrefs are `outside_policy` with no retained URL. It also contains no terms, privacy, acceptable-use, or site-rules text.

## Classification

| Location | Result |
|---|---|
| Reports footer, sidebar, and PIM links | Link not present. No accessible name or retained href is a terms link. |
| Employee List, from the retained inspect | Link not present, on the same basis. |
| Employee List, current open tab | Insufficient evidence. The new inspect timed out. |
| Login page in this REA pass | Not open. Not inspected by REA in this pass. |
| Three outside-policy hrefs on each inspected page | Insufficient evidence for the destination URL. The visible names are not Terms. |
| Terms clauses about automated capture | Not read. No terms page was opened. |

## Acceptance

The criteria require the demo site's terms to be confirmed. No terms page was found or read. REQ-003 stays Not Verified.
