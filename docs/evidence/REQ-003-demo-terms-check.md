# REQ-003 demo-site terms check

Inspection date: 2026-11-15.

Status of REQ-003: unchanged. This note does not mark the requirement Pass.

## How the page was opened

A separate Cursor browser tab was opened. The existing Chrome debugging session on port 9222 was not used. Login was not submitted. No form field was filled. No agreement was accepted. Harbor HR services were not restarted.

## Verified facts

| Item | Observed value |
|---|---|
| URL | `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` |
| Document title | `OrangeHRM` |
| Ready state | `complete` |
| Visible footer lines | `OrangeHRM OS 5.9` and `© 2005 - 2026 OrangeHRM, Inc. All rights reserved.` |

Five links had hrefs on the page:

| Visible text | href |
|---|---|
| none | `https://www.linkedin.com/company/orangehrm/mycompany/` |
| none | `https://www.facebook.com/OrangeHRM/` |
| none | `https://twitter.com/orangehrm?lang=en` |
| none | `https://www.youtube.com/c/OrangeHRMInc` |
| `OrangeHRM, Inc` | `http://www.orangehrm.com/` |

The login form was visible. A username hint and a password hint were on the page. Those values are not copied here. The form was not submitted.

## Missing information

No link on this page is a terms, privacy, acceptable-use, or site-rules page. The corporate home link `http://www.orangehrm.com/` was not followed, because its href is not a terms URL and guessing a path on that host is not allowed.

| Question | Result |
|---|---|
| Terms or site-rules URL | Not identified |
| Terms page title | Not available |
| Clauses on automated observation, automated capture, scraping, or demo restrictions | Not available |
| Automated inspection | Unspecified. No supporting clause was read |
| REA evidence ID | None. This check did not use the REA browser session |

The check stopped after the login page. No further URL was opened.
