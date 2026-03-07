## 1. Setup & Dependencies

- [ ] 1.1 Install `@anthropic-ai/sdk` package
- [ ] 1.2 Add `ANTHROPIC_API_KEY` to environment variables

## 2. Backend Chat API

- [ ] 2.1 Create `POST /api/chat` route in `server/routes.ts` with `isAuthenticated` middleware
- [ ] 2.2 Implement system prompt builder that injects project context, active spec, and lifecycle phase
- [ ] 2.3 Integrate Anthropic SDK to call Claude Sonnet with streaming enabled
- [ ] 2.4 Implement SSE streaming response — send chunks as `data: {"content": "..."}\n\n` and `data: [DONE]\n\n` on completion
- [ ] 2.5 Add error handling: 401 for unauthenticated, 503 for missing API key, error events for API failures

## 3. Frontend Context System

- [ ] 3.1 Create `ChatContext` provider in `client/src/contexts/ChatContext.tsx` with `activeSpec`, `lifecyclePhase`, `projectInfo` state
- [ ] 3.2 Wrap panels in `ChatContext.Provider` in `Home.tsx`
- [ ] 3.3 Add "Open in Chat" click handlers in `SpecPanel.tsx` that update ChatContext
- [ ] 3.4 Add lifecycle phase context updates in `LifecyclePanel.tsx`

## 4. Frontend Chat Integration

- [ ] 4.1 Replace setTimeout mock in `ChatPanel.tsx` with `fetch('/api/chat')` using SSE streaming
- [ ] 4.2 Implement progressive text rendering — update assistant message content as SSE chunks arrive
- [ ] 4.3 Display active context from ChatContext instead of hardcoded values
- [ ] 4.4 Update quick action buttons to be context-aware
- [ ] 4.5 Add error handling UI — show error message on API failure, re-enable submit button

## 5. Verification

- [ ] 5.1 Test chat with Claude — send message and verify streaming response displays correctly
- [ ] 5.2 Test context passing — select spec in SpecPanel, verify it appears in ChatPanel context
- [ ] 5.3 Test error states — remove API key and verify 503 error message shows
- [ ] 5.4 Test multi-turn conversation — send multiple messages and verify conversation history works
