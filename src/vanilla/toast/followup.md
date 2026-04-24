React Adapter — Step by Step Thinking Guide
Step 1: Define What the Adapter Actually Needs to Do
Before writing anything, answer these questions:

Does the React adapter need to render toasts, or does the vanilla core already handle rendering?
Your vanilla core already does DOM manipulation — so what does React actually add?
Answer: React adds 1) a <Toaster /> mount component and 2) a useToast() hook for ergonomics. The imperative toast() API already works without React.
Key insight: The adapter should be a thin wrapper. It should not reimplement toast logic.

Step 2: Decide the Architecture — Two Approaches
Think about which you want:

Option A — Fully Imperative (simplest)
toast.success(...) works anywhere, no React context needed. React adapter is just re-exporting the vanilla toast with typed helpers. No provider, no hook.

This is how sonner works.

Option B — Context + Hook (richer)
A <ToastProvider> wraps the app. useToast() hook gives access to toast methods. Enables subscribing to toast state (e.g. showing a custom <ToastList /> in React instead of vanilla DOM).

This is how react-hot-toast works.

For interview: Option A is faster to implement and sufficient. Option B demonstrates deeper React knowledge. Pick based on time.

Step 3: Plan the <Toaster /> Component
Think about what this component does:

It ensures the container is mounted before any toast fires.
Does it render anything itself, or does the vanilla core handle the DOM?
If vanilla core handles DOM: <Toaster /> just needs to call an init() on mount and a destroy() on unmount.
useEffect with empty deps is your friend here.
Question to think through: What happens if someone calls toast.success() before <Toaster /> mounts? Your lazy container init in the vanilla core already handles this — call that out.

Step 4: Plan the useToast() Hook
Think about what it returns:

Just { toast } — re-export of vanilla functions? Simple but adds no value.
{ toasts, dismiss, dismissAll } — subscribing to live state? This requires the vanilla core to support observers/listeners.
This forces a core change: Your ToastManager needs a pub/sub mechanism.

Add a subscribers: Set<Function> to ToastManager
Notify on createToast and removeToast
Hook subscribes on mount, unsubscribes on unmount
Think about: What does a subscriber receive? The full toastMap? A delta? An array snapshot?

Step 5: Handle React Rendering Inside Toasts (Optional but High Signal)
Standard vanilla adapter: title/desc are strings.

But what if you want title={<strong>Bold title</strong>}?

This requires:

Accepting ReactNode in options
Creating a DOM node, mounting a React root into it via createRoot(node)
Calling root.render(<>{title}</>)
Critically: calling root.unmount() in removeToast to avoid memory leaks
Think about the lifecycle:

Create DOM node
createRoot(node).render(content)
Append to toast
On dismiss → root.unmount() → node.remove()
For interview: Mention this as an extension. Don't implement unless asked.

Step 6: Think About the Package Boundary
For a real library:

toast-core — vanilla, zero deps
toast-react — React adapter, peer dep on React
For interview POC: two files in the same folder is fine, but name them clearly: toast.ts (core) and toast.react.ts or useToast.tsx (adapter).

Step 7: Think About Cleanup
React's StrictMode runs effects twice in dev. Your useEffect mounting the container will run twice — does your initializeContainer guard against duplicate containers? (Your current lazy check if (!this.containers[position]) handles this — mention it.)

Suggested Implementation Order
Add subscribe/unsubscribe to ToastManager (small core change)
Build <Toaster /> component — calls init, registers container
Build useToast() hook — subscribes to state, returns toast API + live toasts array
Test: call toast.success() from outside React — does <Toaster /> reflect it?
(Stretch) Accept ReactNode via createRoot
Interview Talking Points Specific to the Adapter
"The adapter is thin by design — React shouldn't own the toast logic"
"I'm using a pub/sub pattern so the hook re-renders only when toast state changes, not on every render"
"StrictMode double-invocation is safe because lazy init is idempotent"
"If I allowed ReactNode titles, I'd need to track and unmount roots to prevent leaks"
