<script lang="ts">
    import { fade, slide } from "svelte/transition";

    // --- TYPE DEFINITION ---
    interface ContactForm {
        id: number;
        guess_name: string;
        email: string;
        interest_area: string;
        content: string;
        created_at: number;
        is_confirmed: boolean;
    }

    // --- PROPS (Svelte 5 Runes) ---
    let { forms: initialForms = [] }: { forms: ContactForm[] } = $props();

    // --- STATE MANAGEMENT ---
    let forms = $state(initialForms);
    let expandedFormId = $state<number | null>(null);
    let actionStates = $state<{ [key: number]: "toggling" | "deleting" }>({});

    // --- HELPERS ---
    function formatTimestamp(microseconds: number): string {
        const date = new Date(microseconds / 1000);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    }

    // --- API HANDLERS ---
    async function toggleConfirmation(formToUpdate: ContactForm) {
        actionStates[formToUpdate.id] = "toggling";
        try {
            const response = await fetch(`/api/contact-forms`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: formToUpdate.id,
                    is_confirmed: !formToUpdate.is_confirmed,
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to update status.");
            }
            const updatedForm = forms.find((f) => f.id === formToUpdate.id);
            if (updatedForm) {
                updatedForm.is_confirmed = !updatedForm.is_confirmed;
            }
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        } finally {
            delete actionStates[formToUpdate.id];
        }
    }

    async function deleteForm(formToDelete: ContactForm) {
        if (
            !confirm(
                `Are you sure you want to delete the message from "${formToDelete.guess_name}"?`,
            )
        ) {
            return;
        }
        actionStates[formToDelete.id] = "deleting";
        try {
            const response = await fetch(`/api/contact-forms`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: formToDelete.id,
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to delete form.");
            }
            forms = forms.filter((f) => f.id !== formToDelete.id);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        } finally {
            delete actionStates[formToDelete.id];
        }
    }

    function toggleExpand(formId: number) {
        expandedFormId = expandedFormId === formId ? null : formId;
    }
</script>

<div class="contact-forms-container">
    <div class="header">
        <h2 class="title">Contact Form Submissions</h2>
        <p class="subtitle">
            Review, confirm, and delete messages from guests.
        </p>
    </div>

    <div class="table-wrapper">
        <table class="forms-table">
            <thead>
                <tr>
                    <th>Guest Name</th>
                    <th>Email</th>
                    <th>Interest Area</th>
                    <th class="date-col">Received At</th>
                    <th class="status-col">Status</th>
                    <th class="actions-col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#if forms.length === 0}
                    <tr>
                        <td colspan="6" class="empty-state">
                            <p>No contact form submissions found.</p>
                        </td>
                    </tr>
                {/if}
                {#each forms as form (form.id)}
                    <tr class="form-row">
                        <td data-label="Guest Name">{form.guess_name}</td>
                        <td data-label="Email"
                            ><a href="mailto:{form.email}">{form.email}</a></td
                        >
                        <td data-label="Interest Area"
                            >{form.interest_area.replace(/_/g, " ")}</td
                        >
                        <td data-label="Received At" class="date-col">
                            {formatTimestamp(form.created_at)}
                        </td>
                        <td data-label="Status" class="status-col">
                            <button
                                class="status-toggle"
                                class:confirmed={form.is_confirmed}
                                onclick={() => toggleConfirmation(form)}
                                disabled={!!actionStates[form.id]}
                                aria-label="Toggle confirmation status"
                            >
                                {#if actionStates[form.id] === "toggling"}
                                    <div class="spinner small"></div>
                                {:else}
                                    <div class="toggle-dot"></div>
                                {/if}
                                <span class="toggle-text">
                                    {form.is_confirmed
                                        ? "Confirmed"
                                        : "Pending"}
                                </span>
                            </button>
                        </td>
                        <td data-label="Actions" class="actions-col">
                            <div class="action-buttons">
                                <button
                                    class="action-button view-button"
                                    onclick={() => toggleExpand(form.id)}
                                >
                                    {expandedFormId === form.id
                                        ? "Hide"
                                        : "View"}
                                </button>
                                <button
                                    class="action-button delete-button"
                                    onclick={() => deleteForm(form)}
                                    disabled={!!actionStates[form.id]}
                                >
                                    {#if actionStates[form.id] === "deleting"}
                                        <div class="spinner small"></div>
                                    {:else}
                                        Delete
                                    {/if}
                                </button>
                            </div>
                        </td>
                    </tr>
                    {#if expandedFormId === form.id}
                        <tr class="content-row" transition:slide|local>
                            <td colspan="6">
                                <div class="content-body">
                                    <p class="message-content">
                                        {form.content}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    :root {
        --color-bg: #0a0a0a;
        --color-bg-surface: #1a1a1a;
        --color-bg-surface-hover: #2a2a2a;
        --color-border: #2a2a2a;
        --color-text-primary: #f0f0f0;
        --color-text-secondary: #a3a3a3;
        --color-primary: #06b6d4;
        --color-primary-hover: #0891b2;
        --color-danger: #ef4444;
        --color-danger-hover: #dc2626;
        --color-success: #22c55e;
    }

    .contact-forms-container {
        width: 100%;
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background: var(--color-bg);
        color: var(--color-text-primary);
    }

    .header {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--color-border);
    }
    .title {
        font-size: 1.75rem;
        font-weight: 700;
    }
    .subtitle {
        font-size: 1rem;
        color: var(--color-text-secondary);
        margin-top: 0.25rem;
    }

    .table-wrapper {
        overflow-x: auto;
        background: var(--color-bg-surface);
        border-radius: 0.75rem;
        border: 1px solid var(--color-border);
    }

    .forms-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }

    .forms-table th,
    .forms-table td {
        padding: 1rem 1.25rem;
        white-space: nowrap;
    }

    .forms-table thead {
        background-color: var(--color-bg-surface-hover);
        border-bottom: 2px solid var(--color-border);
    }

    .forms-table th {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--color-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .form-row {
        border-bottom: 1px solid var(--color-border);
        transition: background-color 0.2s;
    }
    .form-row:last-child,
    .content-row {
        border-bottom: none;
    }
    .form-row:hover {
        background-color: var(--color-bg-surface-hover);
    }

    td a {
        color: var(--color-primary);
        text-decoration: none;
        transition: color 0.2s;
    }
    td a:hover {
        color: var(--color-primary-hover);
    }

    .date-col {
        width: 220px;
        color: var(--color-text-secondary);
    }
    .status-col {
        width: 150px;
        text-align: center;
    }
    .actions-col {
        width: 180px;
        text-align: center;
    }

    /* Status Toggle */
    .status-toggle {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem;
        border-radius: 9999px;
        background-color: var(--color-bg);
        border: 1px solid var(--color-border);
        cursor: pointer;
        min-width: 110px;
        justify-content: center;
        transition: all 0.3s;
    }
    .status-toggle:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
    .toggle-dot {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: var(--color-text-secondary);
        transition: all 0.3s;
    }
    .toggle-text {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-secondary);
        transition: color 0.3s;
    }
    .status-toggle.confirmed {
        background-color: color-mix(
            in srgb,
            var(--color-success) 20%,
            transparent
        );
        border-color: var(--color-success);
    }
    .status-toggle.confirmed .toggle-dot {
        background-color: var(--color-success);
        transform: translateX(100%);
    }
    .status-toggle.confirmed .toggle-text {
        color: var(--color-success);
    }

    /* Action Buttons */
    .action-buttons {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
    }
    .action-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: all 0.2s;
    }
    .action-button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    .view-button:hover:not(:disabled) {
        border-color: var(--color-primary);
        color: var(--color-primary);
        transform: translateY(-2px);
    }
    .delete-button:hover:not(:disabled) {
        background-color: var(--color-danger-hover);
        border-color: var(--color-danger-hover);
        color: var(--color-text-primary);
        transform: translateY(-2px);
    }

    /* Expanded Message Area */
    .content-row td {
        padding: 0;
    }
    .form-row:hover + .content-row,
    .content-row:hover {
        background-color: var(--color-bg-surface-hover);
    }
    .content-body {
        padding: 1rem 1.25rem;
    }
    .message-content {
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;
        margin: 0;
        white-space: pre-wrap;
        line-height: 1.7;
        color: var(--color-text-primary);
        font-size: 0.95rem;
    }

    /* --- Empty State & Spinner --- */
    .empty-state {
        text-align: center;
        padding: 3rem;
        color: var(--color-text-secondary);
    }
    .spinner {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid var(--color-border);
        border-top-color: var(--color-primary);
        animation: spin 1s linear infinite;
    }
    .spinner.small {
        width: 1rem;
        height: 1rem;
        border-width: 2px;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 768px) {
        .table-wrapper {
            overflow-x: hidden;
        }
        .forms-table thead {
            display: none;
        }
        .forms-table tr {
            display: block;
            border: 1px solid var(--color-border);
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            overflow: hidden;
        }
        .form-row {
            border-bottom: none;
        }
        .forms-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--color-border);
            white-space: normal;
        }
        .forms-table td:last-child {
            border-bottom: none;
        }
        .forms-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: var(--color-text-secondary);
            padding-right: 1rem;
        }
        .date-col,
        .status-col,
        .actions-col {
            width: auto;
        }

        .content-row td {
            display: block;
            padding: 0;
        }
        .content-row td::before {
            display: none;
        }
        .content-body {
            padding: 0.5rem; /* Give it a little space on mobile */
        }
    }
</style>
