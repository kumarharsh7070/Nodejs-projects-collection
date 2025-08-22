const API_BASE = "/api/v1";
let token = "";

// Register
async function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  alert(JSON.stringify(data));
}

// Login
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (data.token) {
    token = data.token;
    alert("Login successful ✅");
    document.getElementById("jobsSection").classList.remove("hidden");
    loadJobs();
  } else {
    alert("Login failed ❌");
  }
}

// Create Job
async function createJob() {
  const company = document.getElementById("jobCompany").value;
  const position = document.getElementById("jobPosition").value;

  const res = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ company, position })
  });
  await res.json();
  loadJobs();
}

// Load Jobs
async function loadJobs() {
  const res = await fetch(`${API_BASE}/jobs`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();

  const jobsList = document.getElementById("jobsList");
  jobsList.innerHTML = "";

  data.jobs.forEach(job => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><b>${job.company}</b> - ${job.position}</span>
      <span class="job-actions">
        <button onclick="editJob('${job._id}', '${job.company}', '${job.position}')">✏️ Edit</button>
        <button onclick="deleteJob('${job._id}')">🗑 Delete</button>
      </span>
    `;
    jobsList.appendChild(li);
  });
}

// Edit Job
async function editJob(id, oldCompany, oldPosition) {
  const company = prompt("Edit company:", oldCompany);
  const position = prompt("Edit position:", oldPosition);
  if (!company || !position) return;

  await fetch(`${API_BASE}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ company, position })
  });

  loadJobs();
}

// Delete Job
async function deleteJob(id) {
  if (!confirm("Are you sure you want to delete this job?")) return;

  await fetch(`${API_BASE}/jobs/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  loadJobs();
}
