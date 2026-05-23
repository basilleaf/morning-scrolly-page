@AGENTS.md

## RSS Feed Rules
- Every RSS feed route MUST import `BLOCKED_TOPICS` from `@/lib/content-filters` and apply `.filter(({ title }) => !BLOCKED_TOPICS.test(title))` to the stories array before returning.
