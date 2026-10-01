// Import React hooks for state, refs and effects
import { useState, useRef, useEffect } from "react";
// Import the lucide icons used in the chat interface
import { MessageSquareText, Send, Sparkles, RotateCcw, UserRound, Bot } from "lucide-react";
// Import the reusable card and disclaimer components
import Card, { CardHeader } from "../components/Card";
import Disclaimer from "../components/Disclaimer";
// Import the mock assistant data and service
import { ASSISTANT_GREETING, SUGGESTED_QUESTIONS } from "../data/mockAssistant";
// Import the mock service that simulates the future API call
import { sendAssistantMessage } from "../services/assistantService";
// Import the time formatter for the initial greeting
import { formatTime } from "../utils/formatters";
// Import the page title hook
import { useDocumentTitle } from "../hooks/useDocumentTitle";
// Import the cn helper for conditional classes
import { cn } from "../utils/cn";

/**
 * Assistant - the chat interface of KhetiGPT.
 * Runs entirely on a local keyword based response engine, clearly labelled
 * as "Demo AI Mode". No Gemini API call is made in this phase.
 */
export default function Assistant() {
  // Set the browser tab title for this page
  useDocumentTitle("AI Assistant");

  // Conversation state: an array of message objects
  const [messages, setMessages] = useState(() => [
    // Seed the conversation with the assistant greeting
    {
      // Copy the greeting content
      ...ASSISTANT_GREETING,
      // Attach the current time to the first message
      time: formatTime(),
    },
  ]);

  // Current value of the chat input
  const [input, setInput] = useState("");
  // Flag that shows the typing indicator while the mock reply is delayed
  const [isTyping, setIsTyping] = useState(false);
  // Ref used to scroll the conversation to the bottom automatically
  const scrollRef = useRef(null);

  // Scroll to the newest message whenever messages or the typing flag change
  useEffect(() => {
    // Guard against a missing ref
    if (scrollRef.current) {
      // Scroll the container to the bottom smoothly
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
    // Re-run on every new message and typing change
  }, [messages, isTyping]);

  /** Appends a message object to the conversation */
  const addMessage = (message) => {
    // Update the state with the new message added to the end
    setMessages((current) => [...current, message]);
  };

  /** Sends the user question and receives the mock assistant reply */
  const handleSend = async (question) => {
    // Normalise the question and ignore empty submissions
    const text = String(question || input).trim();
    // Do nothing when there is nothing to send
    if (!text || isTyping) return;

    // Add the user message to the conversation
    addMessage({
      // Sender identifier
      sender: "user",
      // Message body
      text,
      // Timestamp for the message
      time: formatTime(),
    });

    // Clear the input field for the next question
    setInput("");
    // Show the typing indicator while waiting for the mock reply
    setIsTyping(true);

    // Request the mock reply from the local service
    const reply = await sendAssistantMessage(text);

    // Add the assistant reply to the conversation
    addMessage(reply);
    // Hide the typing indicator
    setIsTyping(false);
  };

  /** Handles the form submission from the chat input */
  const handleSubmit = (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Send the current input value
    handleSend(input);
  };

  /** Resets the conversation back to the greeting message */
  const handleReset = () => {
    // Restore the original single message conversation
    setMessages([{ ...ASSISTANT_GREETING, time: formatTime() }]);
  };

  return (
    // Fragment so the header and the chat card can be returned together
    <>
      {/* Page heading block */}
      <div className="mb-6">
        {/* Flex row with the title and the demo badge */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Icon tile for the module */}
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            {/* Chat icon */}
            <MessageSquareText size={22} aria-hidden="true" />
          </span>
          {/* Page title */}
          <h1 className="font-display text-xl font-bold text-brand-950 sm:text-2xl">
            AI Farming Assistant
          </h1>
          {/* Demo AI mode badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-800">
            {/* Sparkles icon */}
            <Sparkles size={12} aria-hidden="true" />
            {/* Badge label */}
            Demo AI Mode
          </span>
        </div>
        {/* Page description */}
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Ask farming related questions and receive answers generated by a small local knowledge
          base. The Gemini API integration is planned for a later phase of the project.
        </p>
      </div>

      {/* Chat layout: conversation on the left, suggestions on the right */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversation card spans two columns on desktop */}
        <Card className="flex h-[70vh] flex-col p-0 lg:col-span-2" padded={false}>
          {/* Chat header with the assistant identity and the reset button */}
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            {/* Left side: avatar and labels */}
            <div className="flex items-center gap-3">
              {/* Assistant avatar tile */}
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                {/* Bot icon */}
                <Bot size={20} aria-hidden="true" />
              </span>
              {/* Name and status */}
              <div>
                {/* Assistant name */}
                <p className="text-sm font-semibold text-brand-950">KhetiGPT Assistant</p>
                {/* Status line */}
                <p className="text-xs text-ink-muted">Local demo response engine</p>
              </div>
            </div>

            {/* Reset conversation button */}
            <button
              // Avoid form submission
              type="button"
              // Reset the conversation
              onClick={handleReset}
              // Accessible label
              aria-label="Clear conversation"
              // Tooltip text
              title="Clear conversation"
              // Ghost icon button styling
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-ink-muted transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {/* Reset icon */}
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Scrollable conversation area */}
          <div
            // Ref used for automatic scrolling
            ref={scrollRef}
            // ARIA live region announces new messages to screen readers
            aria-live="polite"
            // Scroll container styling with a slim scrollbar
            className="scrollbar-thin flex-1 space-y-4 overflow-y-auto bg-surface px-4 py-5 sm:px-5"
          >
            {/* Map every message into a bubble */}
            {messages.map((message, index) => (
              // Wrapper aligned according to the message sender
              <div
                // Unique key per message
                key={index}
                // User messages sit on the right, assistant messages on the left
                className={cn("flex gap-2.5", message.sender === "user" && "flex-row-reverse")}
              >
                {/* Avatar for the message sender */}
                <span
                  // Avatar colour depends on the sender
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    message.sender === "user"
                      ? "bg-surface-alt text-ink-soft"
                      : "bg-brand-600 text-white"
                  )}
                >
                  {/* User or bot icon */}
                  {message.sender === "user" ? (
                    // User icon
                    <UserRound size={16} aria-hidden="true" />
                  ) : (
                    // Bot icon
                    <Bot size={16} aria-hidden="true" />
                  )}
                </span>

                {/* Bubble and timestamp column */}
                <div
                  // Limit the bubble width and align it to the correct side
                  className={cn(
                    "flex max-w-[85%] flex-col gap-1 sm:max-w-[75%]",
                    message.sender === "user" ? "items-end" : "items-start"
                  )}
                >
                  {/* Message bubble */}
                  <div
                    // Bubble colours depend on the sender
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                      message.sender === "user"
                        ? "rounded-br-md bg-brand-600 text-white"
                        : "rounded-bl-md border border-line bg-white text-ink-soft"
                    )}
                  >
                    {/* Message text preserved with line breaks */}
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>

                  {/* Timestamp under the bubble */}
                  <span className="px-1 text-[11px] text-ink-muted">
                    {/* Screen reader friendly sender label plus the time */}
                    {message.sender === "user" ? "You" : "KhetiGPT"} · {message.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator shown while the mock reply is delayed */}
            {isTyping ? (
              // Row aligned like an assistant message
              <div className="flex gap-2.5">
                {/* Assistant avatar */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
                  {/* Bot icon */}
                  <Bot size={16} aria-hidden="true" />
                </span>
                {/* Bubble containing three animated dots */}
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 shadow-sm">
                  {/* Three dots with staggered animation delays */}
                  <span className="typing-dot h-2 w-2 rounded-full bg-brand-500" />
                  {/* Second dot delayed by 150ms */}
                  <span
                    className="typing-dot h-2 w-2 rounded-full bg-brand-500"
                    style={{ animationDelay: "150ms" }}
                  />
                  {/* Third dot delayed by 300ms */}
                  <span
                    className="typing-dot h-2 w-2 rounded-full bg-brand-500"
                    style={{ animationDelay: "300ms" }}
                  />
                  {/* Screen reader text describing the state */}
                  <span className="sr-only">Assistant is typing</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Chat input area */}
          <form
            // Submit handler sends the message
            onSubmit={handleSubmit}
            // Form styling with a top border
            className="border-t border-line bg-white px-4 py-3.5 sm:px-5"
          >
            {/* Input row with the text field and send button */}
            <div className="flex items-end gap-2.5">
              {/* Chat text input */}
              <label htmlFor="chat-input" className="sr-only">
                Type your farming question
              </label>
              {/* Textarea-like input grows with the layout */}
              <input
                // Field id matching the label above
                id="chat-input"
                // Input type
                type="text"
                // Current value
                value={input}
                // Update the state on every keystroke
                onChange={(event) => setInput(event.target.value)}
                // Placeholder guiding the user
                placeholder="Ask about crops, soil, fertilizer or weather…"
                // Submit the form when Enter is pressed
                onKeyDown={(event) => {
                  // Only send on Enter without the shift key
                  if (event.key === "Enter" && !event.shiftKey) {
                    // Prevent the default newline behaviour
                    event.preventDefault();
                    // Submit through the form handler
                    handleSubmit(event);
                  }
                }}
                // Disabled while the assistant is replying
                disabled={isTyping}
                // Input styling
                className="h-11 flex-1 rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:opacity-60"
              />

              {/* Send button */}
              <button
                // Avoid double submission
                type="submit"
                // Accessible label
                aria-label="Send message"
                // Tooltip
                title="Send message"
                // Disabled while typing or when the input is empty
                disabled={isTyping || input.trim() === ""}
                // Primary green icon button styling
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {/* Send icon */}
                <Send size={18} aria-hidden="true" />
              </button>
            </div>
          </form>
        </Card>

        {/* Right column: suggested questions and information */}
        <div>
          {/* Suggested questions card */}
          <Card>
            {/* Card header */}
            <CardHeader
              // Title
              title="Suggested Questions"
              // Description
              description="Tap a question to send it instantly."
              // Icon
              icon={Sparkles}
            />

            {/* Vertical list of question buttons */}
            <div className="space-y-2.5">
              {/* Map the suggested questions into buttons */}
              {SUGGESTED_QUESTIONS.map((question) => (
                // Single question button
                <button
                  // Unique key per question
                  key={question}
                  // Avoid form submission behaviour
                  type="button"
                  // Send the question text directly
                  onClick={() => handleSend(question)}
                  // Disabled while the assistant is replying
                  disabled={isTyping}
                  // Row styling with a hover state
                  className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left text-sm font-medium text-ink-soft transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {/* Question text */}
                  {question}
                </button>
              ))}
            </div>
          </Card>

          {/* How this works card */}
          <Card className="mt-6">
            {/* Card header */}
            <CardHeader
              // Title
              title="How this demo works"
              // Description
              description="Transparency about the response source."
              // Icon
              icon={Bot}
            />

            {/* Explanation list */}
            <ul className="space-y-2.5 text-sm leading-relaxed text-ink-soft">
              {/* Point one */}
              <li>
                Your question is matched against a small list of keywords stored in the app.
              </li>
              {/* Point two */}
              <li>The matching rule returns a prepared sample answer written for this project.</li>
              {/* Point three */}
              <li>No request leaves your browser and no API key is used.</li>
            </ul>

            {/* Disclaimer under the list */}
            <Disclaimer
              // Notice text
              text="Demo AI Mode: responses are sample content for academic demonstration only and must not be treated as agricultural advice."
              // Bottom margin is not needed inside this card
              className="mt-4"
            />
          </Card>
        </div>
      </div>
    </>
  );
}
