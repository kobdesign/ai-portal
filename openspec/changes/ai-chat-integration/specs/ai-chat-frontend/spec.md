## ADDED Requirements

### Requirement: Real AI chat interaction

The ChatPanel SHALL send user messages to the backend `/api/chat` endpoint and display streaming AI responses in real-time, replacing all mock/setTimeout behavior.

#### Scenario: User sends a message

- **WHEN** user types a message and presses submit
- **THEN** ChatPanel MUST send POST request to `/api/chat` with messages array and context, and display the streaming response character by character

#### Scenario: Loading state during response

- **WHEN** AI is generating a response
- **THEN** ChatPanel MUST show a loading indicator and disable the submit button until streaming completes

#### Scenario: Error handling

- **WHEN** the API request fails (network error, 401, 503)
- **THEN** ChatPanel MUST display an error message to the user and re-enable the submit button

### Requirement: Cross-panel context sharing

The system SHALL provide a React Context that shares active spec, lifecycle phase, and project information between ChatPanel, SpecPanel, and LifecyclePanel.

#### Scenario: Context displayed in ChatPanel

- **WHEN** user has an active spec selected in SpecPanel
- **THEN** ChatPanel MUST display the active spec reference in the "Active Context" section and include it in API requests

#### Scenario: Context updates from SpecPanel

- **WHEN** user clicks "Open in Chat" on a spec item in SpecPanel
- **THEN** ChatContext MUST update with the selected spec's information

#### Scenario: Context updates from LifecyclePanel

- **WHEN** user views a feature in LifecyclePanel
- **THEN** ChatContext MUST update with the current lifecycle phase

### Requirement: Streaming response display

The ChatPanel SHALL render AI responses progressively as SSE chunks arrive, providing a real-time typing effect.

#### Scenario: Progressive text rendering

- **WHEN** SSE chunks arrive from `/api/chat`
- **THEN** assistant message content MUST update incrementally with each chunk, visible to user in real-time

#### Scenario: Stream interruption

- **WHEN** network connection drops during streaming
- **THEN** ChatPanel MUST display partial response received so far and show an error indicator
