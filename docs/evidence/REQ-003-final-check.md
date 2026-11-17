# REQ-003 final check

Date: 2026-11-15.

REQ-003 status was not changed. This note does not mark it Pass.

## Acceptance criteria

From `docs/FINAL_REQUIREMENT_TRACEABILITY.md`:

Confirm the demo site's terms before automated capture.

## Login page

`list_browser_targets` on `http://127.0.0.1:9222` returned evidence `ev_4aa6a47383234d8bfeba934cc400291fe4dc1fbff874a8c1bb8dda3818b0c515`. The open pages were Employee List and Reports. The login URL was not among them.

Opening the login page from those tabs would navigate the authenticated session. That was not done. No login form was submitted, and no automated capture was run.

The earlier separate-browser check in `docs/evidence/REQ-003-demo-terms-check.md` remains the login-page link inventory. It recorded five hrefs: four social profiles and `http://www.orangehrm.com/` named `OrangeHRM, Inc`. None was a terms, privacy, legal, or acceptable-use link. That check has no REA evidence ID.

`docs/evidence/REQ-003-investigation.md` records the REA inspect of Reports, evidence `ev_0fd8a3c26799ec25c4bcbff45afe2cad6e29dc39396bef5334d4c7a7519307d0`, and the retained Employee List inspect `ev_08220b53ab7d5f458edacde3f613a4406f08689ea7b8121045d075f87ee14756`. Neither retained a terms link.

## Official documents that were read

These are not the hosted demo's usage terms.

| Document | URL | What it is | Applicability to automated capture of the hosted demo |
|---|---|---|---|
| Website privacy policy, revision January 2026 | `https://orangehrm.com/policies/orangehrm-privacy-policy` | Privacy practices for visitors to `www.orangehrm.com` and people who register for OrangeHRM services. It says it does not apply to data collected by the Cloud-Based Enterprise application. | Not demo usage terms. It does not permit automated capture. |
| Service privacy policy, revision April 2026 | `https://orangehrm.com/policies/orangehrm-service-privacy-policy` | Privacy practices for Cloud-Based Enterprise and On-Premise Enterprise applications. | A different product scope. Not read as permission for the public demo. |
| GNU GPL version 3 | `https://www.orangehrmlive.com/policies/gnu-general-public-license` | Software license for the open-source edition. | A license to run and share the program. Not a hosted-demo usage rule. |
| Vulnerability Disclosure Policy, Open Source, version 3.0, effective 6 March 2026 | `https://orangehrm.com/security/opensource/OrangeHRM-Vulnerability-Disclosure-Policy-Opensource.pdf` | Security-research rules. It says security testing, scanning, or probing of OrangeHRM-hosted demo instances is strictly prohibited, and names `opensource-demo.orangehrmlive.com` as not authorized for that activity. Authorized research is limited to self-hosted copies of public releases. | This prohibits security testing, scanning, and probing. It does not grant automated UI capture. |

The sales page `https://orangehrm.com/book-a-free-demo` describes a guided product demonstration. It is not the public host `opensource-demo.orangehrmlive.com`, and it states no capture rule.

## Classification

| Item | Result |
|---|---|
| Terms, privacy, legal, or acceptable-use link on the inspected demo pages | Link not present in the retained names and hrefs |
| Login page through REA in this pass | Not safely accessible. It was not an open target |
| Privacy policy | Read. It governs `www.orangehrm.com`, not automated demo capture |
| Security-research policy | Read. It prohibits security testing, scanning, and probing of the hosted demo. It is not a grant of capture permission |
| Demo usage terms for automated capture | Not found |

## Blocker

No terms page for the hosted demo was opened, and no read document permits automated capture of that demo. REQ-003 stays Not Verified. No automated capture was started.
