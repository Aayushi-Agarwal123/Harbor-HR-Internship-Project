# REQ-003 verification blocker

Date: 2026-11-15.

REQ-003 stays Not Verified. This note does not mark it Pass. Existing evidence files were not edited. No new demo capture was run.

## Acceptance criteria

From `docs/FINAL_REQUIREMENT_TRACEABILITY.md`:

Confirm the demo site's terms before automated capture.

The guide says the same thing in two places. The scope note says to confirm the site's terms before automated scenario capture. Section 16 includes the checklist item "Site rules/authorization for observation checked."

Login, logout, filters, sorting, unread profile sections, and demo save, edit, or delete are not this sentence. They belong to other requirements. Observing them would not confirm the demo site's terms.

## What was inspected

| Source | What it established |
|---|---|
| `docs/evidence/REQ-003-demo-terms-check.md` | Separate browser, login URL, five hrefs. None is a terms, privacy, legal, or acceptable-use page. No REA evidence ID. |
| `docs/evidence/REQ-003-investigation.md` | REA targets were Reports and Employee List. Reports inspect `ev_0fd8a3c26799ec25c4bcbff45afe2cad6e29dc39396bef5334d4c7a7519307d0`. Retained Employee List inspect `ev_08220b53ab7d5f458edacde3f613a4406f08689ea7b8121045d075f87ee14756`. A new Employee List inspect timed out twice and returned no evidence ID. |
| `docs/evidence/REQ-003-final-check.md` | Login was not an open REA target, evidence `ev_4aa6a47383234d8bfeba934cc400291fe4dc1fbff874a8c1bb8dda3818b0c515`. Privacy policy, service privacy policy, GPL, and the vulnerability-disclosure policy were read as different documents. |

This pass did not open the demo again, did not submit login, and did not call a capture tool.

## Verified

| Item | Class |
|---|---|
| The login page's five recorded hrefs are social profiles and `http://www.orangehrm.com/` | Observed in the separate-browser note |
| Reports and the retained Employee List inspect do not contain a terms, privacy, acceptable-use, or site-rules link | Observed in the REA note |
| The website privacy policy, the service privacy policy, the GPL, and the vulnerability-disclosure policy are not the hosted demo's usage terms | Observed by reading those documents in the final-check note |
| The vulnerability-disclosure policy prohibits security testing, scanning, and probing of `opensource-demo.orangehrmlive.com` | Observed in that policy. It does not grant automated UI capture |

## Unverified

| Item | Class |
|---|---|
| A hosted-demo terms page that says whether automated capture is permitted | Unknown. No such page was opened |
| Whether earlier automated captures were allowed by the site's terms | Unknown. Those captures happened before any terms page was read, so they cannot satisfy "before automated capture" |

## Blocker

No document read so far is the hosted demo's usage terms for automated capture. The login page and the two inspected signed-in pages do not link to one. Privacy, license, and security-research documents do not substitute for it.

`docs/FINAL_PROJECT_STATUS.md` still says no terms check was recorded. That sentence is stale. Three checks were recorded. They did not find the terms page. The status remains Not Verified for that reason, not because the checks are absent.

## Minimum next action

Read a page whose own address is the hosted demo's terms or site rules, and record whether automated scenario capture is permitted, prohibited, or unstated. Do not guess a path from `http://www.orangehrm.com/`. Do not navigate an authenticated demo tab to reach login. Do not run automated capture until that page has been read.

## Recheck on 2026-11-16

`list_browser_targets` on `http://127.0.0.1:9222` returned `endpoint_unreachable`. No authorized OrangeHRM tab was available to read. The local Harbor HR browser was not used as a substitute. No demo page was opened and no capture was run. REQ-003 stays NOT VERIFIED.

External action: a person must find and record the hosted demo's own terms or site-rules page, including whether automated capture is permitted, prohibited, or unstated. Until that record exists, do not start Chrome debugging against the demo and do not open Project Info there.
