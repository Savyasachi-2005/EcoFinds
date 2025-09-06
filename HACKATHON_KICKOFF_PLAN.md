# Hackathon Kickoff: The 30-Minute Playbook

**Objective:** A flawless, synchronized start to ensure maximum productivity from the first minute.

---

### **1. Single Source of Truth with Git (9:00–9:05 AM)**

*   **Lead:** Create a new empty repository on GitHub or GitLab.
*   **Lead:** Grant collaborator access to all team members.
*   **All Team Members:** Clone the repository to your local machine.
    ```bash
    git clone <repository_url>
    ```
*   **Strategic Note:** From this point forward, all code changes must be committed to this repository. No local, untracked code is allowed.

---

### **2. Synchronize Odoo Development Environment (9:05–9:15 AM)**

*   **All Team Members:** Verbally agree on the exact Odoo version to be used (e.g., Odoo 17.0).
*   **All Team Members:** Configure a custom addons path in your `odoo.conf` file. This ensures everyone's setup points to the new repository.
    *Example `odoo.conf` entry:*
    ```ini
    addons_path = /path/to/odoo/odoo/addons, /path/to/your/cloned/repo
    ```
*   **All Team Members:** Start your local Odoo server to verify that it runs without errors.

---

### **3. Create Professional Module Structure (9:15–9:25 AM)**

*   **Backend Lead:** Navigate into the cloned repository directory and run the Odoo scaffold command to create the module structure.
    ```bash
    odoo-bin scaffold eco_finds .
    ```
*   **Backend Lead:** Inspect the newly generated directory structure to ensure it is correct:
    ```
    eco_finds/
    ├── __init__.py
    ├── __manifest__.py
    ├── controllers/
    ├── models/
    ├── security/
    └── views/
    ```
*   **Backend Lead:** Commit this initial structure to the repository with a clear message.
    ```bash
    git add .
    git commit -m "Initial commit: scaffolded eco_finds module structure"
    git push origin main
    ```
*   **All Other Team Members:** Pull the changes to synchronize your local environment.
    ```bash
    git pull
    ```

---

### **4. Final Alignment & Role Delegation (9:25–9:30 AM)**

*   **Leader:** Briefly review the immediate roadmap.
    *   **Phase 2 Goal (9:30–11:00 AM):** Build the core backend models for `Product` and `Category`.
*   **Leader:** Assign and confirm the following tasks:
    *   **Backend Lead:** Begin defining the core models in the `models/` directory and set up initial access rights in `security/ir.model.access.csv`.
    *   **Frontend/Controller Lead:** Start studying the project wireframes and the Odoo Website Builder documentation to prepare for creating controllers and QWeb templates (no coding required yet, focus on planning).
*   **Leader:** Conclude with a quick confirmation check:
    > "Everyone clear on their next task?"

---

**Kickoff Complete. Ready, set, code!**
