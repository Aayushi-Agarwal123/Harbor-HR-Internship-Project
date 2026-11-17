# REQ-055 compare_web_captures

Inspection date: 2026-11-15.

REQ-055 status was not changed. This note does not mark it Pass.

## Requirement

From `docs/FINAL_REQUIREMENT_TRACEABILITY.md`:

Compare captures with `compare_web_captures` after normalizing volatile fields.

## Tool

Installed package: `rea-agents@6.9.0`.

The MCP schema for `compare_web_captures` takes one complete group: `before.inspection` and `after.inspection`, each a complete `inspect_web_page` `normalized_result`, or `before_scenario` and `after_scenario`. Optional `normalization.rules` are literal `rule_id`, `artifacts`, `match`, and `replacement` values. The installed guidance line is: two normalized passive captures or recorded scenarios.

The two normalized results were too large to send through the MCP call. The same package's command was used instead. That command compares the JSON files locally. It was not given a CDP endpoint, and it was not pointed at port 9222.

```text
node rea.mjs compare-web-captures req055-before.json req055-after.json
```

Each file was `{"inspection": <normalized_result>}`. No normalization rules were supplied. No literal volatile string was established from the captures, so none was invented.

Exit code: 0.

## Captures compared

Both are retained `inspect_web_page` records for the same URL, `https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList`. Document title on both: `OrangeHRM`. Storage values were redacted. Completeness status on both: `policy_filtered`.

| Role | Evidence ID | Capture ended | Accessibility nodes | DOM nodes |
|---|---|---|---|---|
| Before | `ev_342002a3508a74d919181cd04993486a157dbce4cafc0e66ed198bf35b801f9e` | 2026-11-14T19:14:14.619Z | 422 | 708 |
| After | `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400` | 2026-11-15T13:16:19.177Z | 441 | 731 |

The earlier employee-list pair is not in the current retained set, so it was not compared. The redacted project JSON files were not used as inputs. The original captures were not edited.

## Result

Comparison evidence ID: `ev_c976fdfc8d14ed0bb7bbd6ba83dc1f9fdff86a6382f0733a820cb1305792ef3c`.

Predicate: `rea.web-capture-diff`. Confidence: `derived`.

`overall_status`: `changed`.

| Dimension | Status | Changes |
|---|---|---|
| DOM structure | changed | 1: `document` modified |
| Accessibility | changed | 1: `accessibility_tree` modified |
| Resources | unchanged | 0 |
| Scripts | unknown | Script inventory or source evidence was incomplete in at least one observation |
| Network | unknown | Network or payload-shape coverage was limited or incomplete |
| Metadata | unknown | Safe metadata capture was incomplete |
| WebMCP | unknown | Discovery evidence was unavailable or incomplete |
| Storage | unknown | Fingerprints, inventories, usage, quota, or schema coverage were unavailable or truncated |

Input SHA-256 recorded by the tool: `0cd4223a90de7dd23b0bdd0ab0d9c9f3aef12081aedb8ef7b550c15de92c775e`.

The tool states that a changed status proves an observed difference, and an unknown status means comparison facts were unavailable. Unknown is not equality.

## What this does not establish

No volatile-field normalization policy was applied. The requirement text includes that step. REQ-055 stays Not Verified until that gap is accepted or a real normalization policy is recorded and the comparison is repeated.
