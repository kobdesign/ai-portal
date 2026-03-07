## ADDED Requirements

### Requirement: Chat API endpoint

The system SHALL expose a `POST /api/chat` endpoint that accepts user messages and returns AI-generated responses from Claude API via streaming.

#### Scenario: Successful chat request

- **WHEN** authenticated user sends POST to `/api/chat` with `{ messages: [{ role: "user", content: "สวัสดี" }], context: {} }`
- **THEN** server MUST return a streaming SSE response with `Content-Type: text/event-stream` containing Claude's response chunks

#### Scenario: Unauthenticated request

- **WHEN** unauthenticated user sends POST to `/api/chat`
- **THEN** server MUST return HTTP 401 Unauthorized

#### Scenario: Missing API key

- **WHEN** `ANTHROPIC_API_KEY` environment variable is not set
- **THEN** server MUST return HTTP 503 with error message "AI service not configured"

### Requirement: Context-aware system prompt

The system SHALL construct a system prompt that includes project context, active spec reference, and lifecycle phase when provided by the client.

#### Scenario: Chat with full context

- **WHEN** user sends chat with `context: { projectName: "AI Portal", activeSpec: "US-101", lifecyclePhase: "Implement" }`
- **THEN** system prompt MUST include project name, spec reference, and lifecycle phase information

#### Scenario: Chat without context

- **WHEN** user sends chat with empty context `{}`
- **THEN** system MUST use a default system prompt without project-specific context

### Requirement: Streaming response

The system SHALL stream Claude's response using Server-Sent Events (SSE) format, sending each text chunk as it arrives from the Anthropic API.

#### Scenario: Streaming chunks

- **WHEN** Claude API returns response in chunks
- **THEN** each chunk MUST be sent as `data: {"content": "<chunk_text>"}\n\n` event to the client

#### Scenario: Stream completion

- **WHEN** Claude API finishes generating response
- **THEN** server MUST send `data: [DONE]\n\n` event and close the connection

#### Scenario: API error during streaming

- **WHEN** Claude API returns an error during streaming
- **THEN** server MUST send `data: {"error": "<error_message>"}\n\n` event and close the connection

### Requirement: Conversation history support

The system SHALL accept an array of previous messages to maintain multi-turn conversation context.

#### Scenario: Multi-turn conversation

- **WHEN** user sends `messages: [{ role: "user", content: "msg1" }, { role: "assistant", content: "resp1" }, { role: "user", content: "msg2" }]`
- **THEN** server MUST forward all messages to Claude API to maintain conversation context
