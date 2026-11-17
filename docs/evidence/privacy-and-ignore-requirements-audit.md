# Privacy, redaction, and ignore-rule audit

Date: 2026-11-15.

This audit does not change a status, a total, `.gitignore`, a privacy note, or an evidence file. No account label, password, cookie, or token is copied here.

The four requirements are not the same check. Each section uses that row's sentence.

Current statuses: REQ-031 Partial, REQ-057 Partial, REQ-008 Partial, REQ-034 Partial. Totals stay 36 pass, 15 partial, 2 not verified, 4 out of scope.

## REQ-031

Acceptance: Every parity claim has evidence or an assumption tag.

Existing: `docs/requirements.md` tags rows OBSERVED or PROPOSED and says INFERRED is not used for those items. The traceability matrix uses the same distinction. Proposed edit, delete, sort, and page size are labeled. Local Playwright tests exist for proposed behavior.

Supporting evidence: the requirements file and `docs/FINAL_REQUIREMENT_TRACEABILITY.md`.

Missing: this audit did not re-read every later note for an untagged parity sentence. `docs/FINAL_PRIVACY_AUDIT.md` says `docs/screen-inventory.md`, `docs/pim-implementation-blueprint.md`, and three PIM evidence Markdown files still quote account display labels. Those quotes are not, by themselves, a missing tag.

Observed: the requirements table uses the two tags. The privacy audit names the documents that still quote labels.

Derived: a tag on a local behavior does not make that behavior an OrangeHRM observation.

Unknown: whether every sentence outside `docs/requirements.md` that claims live parity is tagged.

No new browser capture is required. The remaining work is a document pass.

## REQ-057

Acceptance: Exclude secrets, cookies, tokens, and personal account data from shared artifacts.

Existing: `docs/FINAL_PRIVACY_AUDIT.md` and `docs/evidence/REQ-009-api-register.md`. Tests use the synthetic local account. The guide's example password is a local fixture, not a demo secret, and it is not repeated here.

Supporting evidence: the privacy audit. `evidence/navigation.redacted.json` has a null account field, inspection `ev_515f5cc06b8247a56227ff45a022914352805fce1f2809947f6aceef6bd6bc22`. The audit says the key scan did not print a non-empty cookie or token. Ten copies under `docs/proposed-redactions/` do not contain the two account display strings found in the originals. That check was not a field-by-field equivalence.

Missing: nine original JSON files named in the privacy audit still store account display labels. Documentation named in that audit still quotes them. Screenshot PNGs may show the same header. `docker-compose.yml` contains a local database password. The originals have not been replaced by the proposed copies.

Observed: the dashboard JSON no longer stores the label. The proposed copies omit the two known strings. Originals were not overwritten.

Derived: the proposed copies are not yet the shared set.

Unknown: whether `screenshots/*.json` contains account labels. The privacy audit scanned `evidence/`, `docs/`, and `tests/`, not those viewport JSON files.

No new browser capture is required. Do not share the original JSON until the proposed copies are accepted.

## REQ-008

Acceptance: Keep redacted browser evidence and screenshots where available.

Existing: login, dashboard, list, add, and reports JSON are present. The dashboard account field is null. PNG files exist for the login, dashboard, and employee-list viewports. Other viewport files under `screenshots/` are JSON metadata, not PNGs.

Supporting evidence: the privacy audit and the screenshot directory listing.

Missing: the nine original JSON files listed for REQ-057 still store account labels, so those files are not fully redacted. The privacy audit says some PNGs were not kept. The proposed copies exist and have not been accepted as replacements.

Observed: redacted JSON and three PNGs are in the tree. The dashboard label was not saved.

Derived: a filename ending in `redacted.json` does not prove the file has no account label.

Unknown: which screens had a screenshot available that was then not kept. This audit did not invent missing PNGs.

No new browser capture is required. Accepting the proposed copies would be a documentation decision, not a new capture.

## REQ-034

Acceptance: Ignore unsanitized evidence, profiles, and secrets.

The guide says to add `evidence/`, browser profiles, and secrets to `.gitignore` unless the artifacts have been reviewed and sanitized, and not to commit cookies, tokens, passwords, full personal response bodies, or unreviewed captured storage.

Existing `.gitignore` ignores `evidence/*.raw.json`, `screenshots/*.png`, `*.log`, `backend/*.db`, `backend/pgdata/`, `test-results/`, and `playwright-report/`. `backend/.pytest_cache/.gitignore` is the test cache file, not this rule.

Supporting evidence: those two ignore files and the privacy audit's list of labeled JSON.

Missing: `evidence/*.redacted.json` is not ignored, and the privacy audit says some of those files still contain account labels. `screenshots/*.json` is not ignored. No browser-profile pattern is present. The whole `evidence/` directory is not ignored. The labeled files have not been reviewed and sanitized, so the guide's exception does not apply.

Observed: raw JSON, PNG screenshots, database files, and the PostgreSQL data directory are ignored. Redacted JSON is not.

Derived: a later commit of the current tree could include the labeled JSON. This audit did not run git.

Unknown: whether a browser profile directory exists in this project. None was found by the ignore-file read.

No new browser capture is required. Closing the row needs an ignore-rule change after review. This audit does not make that change.

## Ranking

| Rank | ID | Why |
|---|---|---|
| 1 | REQ-034 | The ignore file and the missing patterns can be compared directly. No capture. Low complexity. The change itself is still a later edit. |
| 2 | REQ-008 | The redacted files and the three PNGs exist. The remaining decision is whether the proposed copies replace the labeled originals. |
| 3 | REQ-057 | The same copies and the same labeled docs block sharing. The string check was not a full equivalence check. |
| 4 | REQ-031 | Tags exist in the requirements table. Proving that every later parity sentence is tagged is a wider read. |

## Best next requirement

REQ-034.

Next action: review the labeled JSON named in `docs/FINAL_PRIVACY_AUDIT.md`, then add ignore rules for unsanitized evidence, screenshot JSON, and browser profiles. Do not ignore files that have been accepted as sanitized. Do not edit `.gitignore` as part of this audit.

None of the four is Pass. Documentation and a partial ignore file do not meet the remaining sentences.
