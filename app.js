/**
 * Report Cyber - Core Application Logic
 * Cyberbullying & Incident Redressal Portal
 */

// Initial Seed Data for Pre-loaded Demo Case
const DEFAULT_CASES = [
  {
    id: "CYBER-2026-BL-94821",
    category: "Cyberbullying & Relentless Harassment",
    platforms: ["Instagram", "Discord"],
    perpetrator: "@troll_harasser_99",
    perpetratorContact: "+1 (555) 982-1140 (VoIP Burner)",
    relationship: "Suspected Classmate / School Peer",
    dangerLevel: "Level 3: High (Threat to safety, reputation, or mental health)",
    frequency: "Ongoing daily harassment (High urgency)",
    incidentDate: "2026-10-28",
    description: "The individual has been posting altered images and coordinated harassment across Instagram and Discord servers. They threatened to dox my family address and share non-consensual altered media if I did not pay them or delete my accounts. Direct abusive messages and hate speech were sent continuously.",
    victim: {
      name: "Alex Morgan",
      phone: "+1 (555) 234-5678",
      email: "alex.morgan@safeinbox.org",
      anonymous: false
    },
    station: {
      name: "Metro Central Cyber Crime Cell (HQ)",
      division: "Special Cyberbullying & Digital Threats Taskforce",
      address: "Sector 4, Civic Cyber Center, Station #09",
      officer: "Inspector Elena Rostova",
      badge: "#CY-40982",
      phone: "+1 (555) 019-CYBER",
      email: "e.rostova@cybercell.gov",
      eta: "15 mins"
    },
    timestamp: "2026-11-03 14:22:10 UTC",
    status: "Under Active Forensic Investigation",
    statusStep: 4,
    evidence: [
      {
        id: "ev-1",
        name: "Instagram_Doxxing_Threat_Video.mp4",
        type: "video/mp4",
        size: "24.5 MB",
        hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        preview: "video",
        timestamp: "2026-11-03 14:15:02"
      },
      {
        id: "ev-2",
        name: "Discord_Harassment_Voice_Note.mp3",
        type: "audio/mp3",
        size: "3.8 MB",
        hash: "4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945",
        preview: "audio",
        timestamp: "2026-11-03 14:16:30"
      },
      {
        id: "ev-3",
        name: "Threatening_DMs_Chat_Log.png",
        type: "image/png",
        size: "1.2 MB",
        hash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        preview: "image",
        timestamp: "2026-11-03 14:18:12"
      }
    ],
    chatMessages: [
      {
        sender: "officer",
        name: "Inspector Elena Rostova",
        text: "Hello Alex. I have received your case docket along with the uploaded video and screenshot proofs. Our cell is initiating immediate preservation notices to the platform so evidence cannot be deleted.",
        time: "14:24"
      },
      {
        sender: "officer",
        name: "Inspector Elena Rostova",
        text: "Please do NOT block the account yet, nor delete the chats from your local device. We are logging the IP addresses and metadata headers right now.",
        time: "14:25"
      }
    ]
  }
];

// Stations Database
const CYBER_STATIONS = [
  {
    id: "st-1",
    name: "Metro Central Cyber Crime Cell (HQ)",
    division: "Special Cyberbullying & Digital Threats Taskforce",
    address: "Sector 4, Civic Cyber Center, Station #09",
    officer: "Inspector Elena Rostova",
    badge: "#CY-40982",
    phone: "+1 (555) 019-CYBER",
    emergency: "1930 / +1 (555) 019-9999",
    distance: "2.4 km away",
    eta: "~15 mins",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
    tags: ["24/7 Redressal", "Fast Track Bullying Desk", "Digital Forensics Lab"]
  },
  {
    id: "st-2",
    name: "Zonal Cyber Redressal Station North",
    division: "Youth Harassment & School Safety Wing",
    address: "North Boulevard, Cyber Complex #12",
    officer: "Inspector Kenneth Vance",
    badge: "#CY-31084",
    phone: "+1 (555) 020-VANCE",
    emergency: "1930 / +1 (555) 020-9999",
    distance: "5.8 km away",
    eta: "~35 mins",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
    tags: ["Youth Wing", "Parent Liaison", "Legal Counsel"]
  },
  {
    id: "st-3",
    name: "Tech Hub District Cyber Police Unit",
    division: "Online Defamation & Extortion Bureau",
    address: "Silicon Arcade, Floor 3, District 7",
    officer: "Senior Inspector Marcus Brody",
    badge: "#CY-28491",
    phone: "+1 (555) 030-TECH",
    emergency: "1930 / +1 (555) 030-9999",
    distance: "8.1 km away",
    eta: "~45 mins",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    tags: ["FinTech Scams", "Dark Web Unit", "Platform Subpoena"]
  },
  {
    id: "st-4",
    name: "East Suburban Cyber Cell Division",
    division: "Family & Adolescent Digital Safety Division",
    address: "East Gate Plaza, Block B",
    officer: "Inspector Priya Nair",
    badge: "#CY-55102",
    phone: "+1 (555) 040-PRIYA",
    emergency: "1930 / +1 (555) 040-9999",
    distance: "11.3 km away",
    eta: "~55 mins",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
    tags: ["Trauma Informed", "Anonymous Lodging", "Court Fast-Track"]
  }
];

// App State
let cases = [];
let activeCaseId = null;
let uploadedEvidenceFiles = [];
let currentStep = 1;

// Init App on Page Load
document.addEventListener('DOMContentLoaded', () => {
  loadCases();
  renderStationsGrid();
  updateEvidenceCount();
  setupCharacterCount();
  setupEscapeKey();
});

// Load Cases from LocalStorage or Defaults
function loadCases() {
  const stored = localStorage.getItem('report_cyber_cases');
  if (stored) {
    try {
      cases = JSON.parse(stored);
    } catch (e) {
      cases = DEFAULT_CASES;
    }
  } else {
    cases = DEFAULT_CASES;
    saveCases();
  }

  activeCaseId = cases[0]?.id || null;
  renderCasesNavPills();
  renderActiveCase();
}

function saveCases() {
  localStorage.setItem('report_cyber_cases', JSON.stringify(cases));
  document.getElementById('activeCasesBadge').innerText = cases.length;
}

// Tab Switching
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active', 'text-cyber-cyan', 'bg-cyber-800/80', 'shadow-sm');
    btn.classList.add('text-slate-400');
  });

  const targetTab = document.getElementById(`tab-${tabName}`);
  const targetNav = document.getElementById(`nav-${tabName}`);

  if (targetTab) targetTab.classList.remove('hidden');
  if (targetNav) {
    targetNav.classList.add('active', 'text-cyber-cyan', 'bg-cyber-800/80', 'shadow-sm');
    targetNav.classList.remove('text-slate-400');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}

// Wizard Step Navigation
function goToStep(step) {
  // Simple validation for step 1 & 2
  if (step === 2 && currentStep === 1) {
    const cats = document.querySelectorAll('input[name="incidentCategory"]:checked');
    if (!cats.length) {
      alert("Please select a cyber incident category.");
      return;
    }
  }

  if (step === 3 && currentStep === 2) {
    const handle = document.getElementById('perpetratorHandle').value.trim();
    const desc = document.getElementById('incidentDescription').value.trim();
    if (!handle) {
      alert("Please provide the perpetrator's handle, account URL, or indicate 'Anonymous'.");
      document.getElementById('perpetratorHandle').focus();
      return;
    }
    if (!desc) {
      alert("Please provide details of what happened in the incident description.");
      document.getElementById('incidentDescription').focus();
      return;
    }
  }

  // Update DOM wizard steps
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`wizard-step-${i}`);
    const navEl = document.getElementById(`step-nav-${i}`);
    if (i === step) {
      stepEl.classList.remove('hidden');
      navEl.classList.add('border-cyber-cyan', 'text-cyber-cyan');
      navEl.classList.remove('border-cyber-800', 'text-slate-400');
    } else {
      stepEl.classList.add('hidden');
      if (i < step) {
        navEl.classList.add('border-cyber-cyan', 'text-cyber-cyan');
      } else {
        navEl.classList.remove('border-cyber-cyan', 'text-cyber-cyan');
        navEl.classList.add('border-cyber-800', 'text-slate-400');
      }
    }
  }

  currentStep = step;
  window.scrollTo({ top: 180, behavior: 'smooth' });
}

// Character counter for description
function setupCharacterCount() {
  const textarea = document.getElementById('incidentDescription');
  const counter = document.getElementById('charCount');
  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      counter.innerText = `${textarea.value.length} characters`;
    });
  }
}

// Anonymous Reporting Mode Toggle
function toggleAnonymousMode(checkbox) {
  const grid = document.getElementById('victimDetailsGrid');
  const note = document.getElementById('anonNote');
  if (checkbox.checked) {
    grid.classList.add('opacity-40', 'pointer-events-none');
    note.classList.remove('hidden');
  } else {
    grid.classList.remove('opacity-40', 'pointer-events-none');
    note.classList.add('hidden');
  }
}

// Evidence File Upload & Processing
function handleEvidenceFiles(files) {
  if (!files || !files.length) return;

  Array.from(files).forEach((file, idx) => {
    // Generate realistic SHA-256 mock hash
    const mockHash = generatePseudoHash(file.name + file.size + Date.now() + idx);
    const isVideo = file.type.startsWith('video/');
    const isAudio = file.type.startsWith('audio/');
    const isImage = file.type.startsWith('image/');

    const evidenceItem = {
      id: 'ev-user-' + Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: formatBytes(file.size),
      hash: mockHash,
      preview: isVideo ? 'video' : isAudio ? 'audio' : isImage ? 'image' : 'doc',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    uploadedEvidenceFiles.push(evidenceItem);
  });

  renderEvidenceList();
}

function addSampleEvidence() {
  const sampleItems = [
    {
      id: 'ev-sample-1',
      name: 'Screen_Recording_Disappearing_Threats.mp4',
      type: 'video/mp4',
      size: '18.4 MB',
      hash: 'a7c93e4125b03d98ef732b1297e68512f45812e9b01c44298fc1c149afbf4c89',
      preview: 'video',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    },
    {
      id: 'ev-sample-2',
      name: 'GroupChat_Defamation_Poll_Screenshot.png',
      type: 'image/png',
      size: '2.1 MB',
      hash: '3bc79998124efac01129ae553412be44f014872199b51ca832049e7b1a629910',
      preview: 'image',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
  ];

  uploadedEvidenceFiles.push(...sampleItems);
  renderEvidenceList();
}

function removeEvidence(id) {
  uploadedEvidenceFiles = uploadedEvidenceFiles.filter(item => item.id !== id);
  renderEvidenceList();
}

function renderEvidenceList() {
  const list = document.getElementById('evidenceList');
  const emptyState = document.getElementById('emptyEvidenceState');
  const countEl = document.getElementById('evidenceCount');

  countEl.innerText = uploadedEvidenceFiles.length;

  if (uploadedEvidenceFiles.length === 0) {
    list.innerHTML = `
      <div id="emptyEvidenceState" class="text-center py-8 bg-cyber-950/40 rounded-xl border border-cyber-900 text-slate-500 text-xs">
        <i class="fas fa-file-circle-question text-3xl mb-2 text-slate-600 block"></i>
        No evidence uploaded yet. Attach at least 1 video or screenshot for maximum prosecution speed.
      </div>
    `;
    return;
  }

  list.innerHTML = uploadedEvidenceFiles.map(file => {
    let iconClass = 'fa-file text-slate-400';
    let badgeClass = 'bg-slate-800 text-slate-300';
    let typeName = 'File Document';

    if (file.preview === 'video') {
      iconClass = 'fa-film text-cyber-cyan';
      badgeClass = 'bg-cyan-500/10 text-cyber-cyan border border-cyber-cyan/30';
      typeName = 'Video Proof (Court Admissible)';
    } else if (file.preview === 'audio') {
      iconClass = 'fa-microphone text-purple-400';
      badgeClass = 'bg-purple-500/10 text-purple-300 border border-purple-500/30';
      typeName = 'Audio Voice Recording';
    } else if (file.preview === 'image') {
      iconClass = 'fa-image text-emerald-400';
      badgeClass = 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30';
      typeName = 'Screenshot Evidence';
    }

    return `
      <div class="evidence-card bg-cyber-950 p-4 rounded-xl border border-cyber-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <div class="w-10 h-10 rounded-lg bg-cyber-900 border border-cyber-800 flex items-center justify-center text-lg shrink-0">
            <i class="fas ${iconClass}"></i>
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-bold text-slate-200 truncate max-w-xs">${escapeHtml(file.name)}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${badgeClass}">${typeName}</span>
            </div>
            <div class="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
              <span>${file.size}</span>
              <span>•</span>
              <span class="truncate max-w-xs" title="${file.hash}">SHA256: ${file.hash.substring(0, 16)}...</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
          <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <i class="fas fa-check-shield"></i> Verified
          </span>
          <button type="button" onclick="removeEvidence('${file.id}')" class="p-1.5 text-slate-500 hover:text-red-400 transition" title="Remove evidence item">
            <i class="fas fa-trash-alt text-xs"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Screen recording simulator
let recInterval = null;
let recSeconds = 0;
let isRecording = false;

function openScreenRecorderModal() {
  document.getElementById('screenRecorderModal').classList.remove('hidden');
}

function closeScreenRecorderModal() {
  if (isRecording) toggleSimulatedRecording();
  document.getElementById('screenRecorderModal').classList.add('hidden');
}

function toggleSimulatedRecording() {
  const toggleBtn = document.getElementById('recToggleBtn');
  const indicator = document.getElementById('recIndicator');
  const liveFeed = document.getElementById('recLiveFeed');
  const timer = document.getElementById('recTimer');

  if (!isRecording) {
    // Start
    isRecording = true;
    recSeconds = 0;
    indicator.classList.remove('hidden');
    toggleBtn.innerHTML = '<i class="fas fa-stop"></i> Stop & Attach Recording';
    toggleBtn.classList.remove('bg-red-600', 'hover:bg-red-500');
    toggleBtn.classList.add('bg-slate-700', 'hover:bg-slate-600');

    liveFeed.innerHTML = `
      <div class="text-center space-y-1">
        <i class="fas fa-desktop text-4xl text-cyber-cyan animate-pulse"></i>
        <p class="text-xs font-mono text-cyber-cyan">Capturing Screen Buffer & Audio...</p>
        <p class="text-[10px] text-slate-400">Preserving chat threads & disappearing media</p>
      </div>
    `;

    recInterval = setInterval(() => {
      recSeconds++;
      const mins = String(Math.floor(recSeconds / 60)).padStart(2, '0');
      const secs = String(recSeconds % 60).padStart(2, '0');
      timer.innerText = `${mins}:${secs}`;
    }, 1000);

  } else {
    // Stop & save
    isRecording = false;
    clearInterval(recInterval);
    indicator.classList.add('hidden');
    toggleBtn.innerHTML = '<i class="fas fa-circle"></i> Start Screen Record';
    toggleBtn.classList.add('bg-red-600', 'hover:bg-red-500');
    toggleBtn.classList.remove('bg-slate-700', 'hover:bg-slate-600');

    // Attach as file
    const newVideo = {
      id: 'ev-rec-' + Date.now(),
      name: `Screen_Capture_Incident_${Date.now()}.mp4`,
      type: 'video/mp4',
      size: `${(recSeconds * 1.4 + 2.5).toFixed(1)} MB`,
      hash: generatePseudoHash(`screen-rec-${Date.now()}`),
      preview: 'video',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    uploadedEvidenceFiles.push(newVideo);
    renderEvidenceList();
    closeScreenRecorderModal();
  }
}

// Submit Report Handler
function handleReportSubmit(e) {
  e.preventDefault();

  const category = document.querySelector('input[name="incidentCategory"]:checked')?.value || "Cyberbullying & Relentless Harassment";
  const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(cb => cb.value);
  const perpetrator = document.getElementById('perpetratorHandle').value.trim() || "@anonymous_perpetrator";
  const perpetratorContact = document.getElementById('perpetratorContact').value.trim() || "Not provided";
  const relationship = document.getElementById('knownRelationship').value;
  const incidentDate = document.getElementById('incidentDate').value || new Date().toISOString().split('T')[0];
  const description = document.getElementById('incidentDescription').value.trim();
  const frequency = document.getElementById('incidentFrequency').value;
  const dangerLevel = document.getElementById('dangerLevel').value;

  const isAnonymous = document.getElementById('anonymousReport').checked;
  const victimName = isAnonymous ? "Protected Complainant (Token: #ANON-901)" : (document.getElementById('victimName').value.trim() || "Complainant");
  const victimPhone = isAnonymous ? "Confidential Routing" : (document.getElementById('victimPhone').value.trim() || "+1 (555) 000-0000");
  const victimEmail = isAnonymous ? "confidential@reportcyber.internal" : (document.getElementById('victimEmail').value.trim() || "victim@domain.com");

  // Pick station (station 1 or selected)
  const stationName = document.querySelector('input[name="targetStation"]:checked')?.value || "Metro Central Cyber Crime Cell (HQ)";
  const stationObj = CYBER_STATIONS.find(s => s.name === stationName) || CYBER_STATIONS[0];

  // Evidence fallback if user didn't upload any
  let finalEvidence = [...uploadedEvidenceFiles];
  if (finalEvidence.length === 0) {
    finalEvidence.push({
      id: 'ev-auto-' + Date.now(),
      name: 'Incident_Statement_Signed_Affidavit.pdf',
      type: 'application/pdf',
      size: '540 KB',
      hash: generatePseudoHash('auto-affidavit-' + Date.now()),
      preview: 'doc',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });
  }

  // Generate unique Case ID
  const newCaseId = `CYBER-${new Date().getFullYear()}-BL-${Math.floor(10000 + Math.random() * 90000)}`;

  const newCase = {
    id: newCaseId,
    category: category,
    platforms: selectedPlatforms.length ? selectedPlatforms : ["Online Platform"],
    perpetrator: perpetrator,
    perpetratorContact: perpetratorContact,
    relationship: relationship,
    dangerLevel: dangerLevel,
    frequency: frequency,
    incidentDate: incidentDate,
    description: description,
    victim: {
      name: victimName,
      phone: victimPhone,
      email: victimEmail,
      anonymous: isAnonymous
    },
    station: stationObj,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    status: "Under Active Forensic Investigation",
    statusStep: 3,
    evidence: finalEvidence,
    chatMessages: [
      {
        sender: "officer",
        name: stationObj.officer,
        text: `Official Notice: Case ${newCaseId} has been formally registered and dispatched to ${stationObj.name}. I have been assigned as your Investigating Officer. All uploaded proofs (videos, logs) are locked in our evidence vault.`,
        time: formatCurrentTime()
      },
      {
        sender: "officer",
        name: stationObj.officer,
        text: `I will review the handles and platform logs within the next 30 minutes. You can reply directly here anytime or request a call through the secure desk.`,
        time: formatCurrentTime()
      }
    ]
  };

  // Add to top of cases
  cases.unshift(newCase);
  activeCaseId = newCaseId;
  saveCases();

  // Reset form
  document.getElementById('cyberReportForm').reset();
  uploadedEvidenceFiles = [];
  renderEvidenceList();
  goToStep(1);

  // Switch to My Cases view
  renderCasesNavPills();
  renderActiveCase();
  switchTab('cases');

  // Show success alert modal or notification
  alert(`Official Cyber Case Lodged Successfully!\n\nYour Case ID: ${newCaseId}\nAssigned Officer: ${stationObj.officer}\nStation: ${stationObj.name}\n\nYour evidence has been cryptographically signed and routed to the station desk.`);
}

// Render Case Navigation Pills
function renderCasesNavPills() {
  const container = document.getElementById('casesListPills');
  if (!container) return;

  container.innerHTML = cases.map(c => {
    const isActive = c.id === activeCaseId;
    return `
      <button onclick="selectActiveCase('${c.id}')" class="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition shrink-0 flex items-center gap-2 ${
        isActive 
          ? 'bg-cyber-cyan text-cyber-950 shadow-md' 
          : 'bg-cyber-950 border border-cyber-800 text-slate-400 hover:text-slate-200'
      }">
        <i class="fas fa-shield-alt"></i>
        <span>${c.id}</span>
      </button>
    `;
  }).join('');
}

function selectActiveCase(caseId) {
  activeCaseId = caseId;
  renderCasesNavPills();
  renderActiveCase();
}

// Render Active Case Details
function renderActiveCase() {
  const c = cases.find(item => item.id === activeCaseId) || cases[0];
  if (!c) return;

  document.getElementById('viewCaseTitle').innerText = c.category;
  document.getElementById('viewCaseId').innerText = c.id;
  document.getElementById('viewCaseTimestamp').innerText = `Lodged on ${c.timestamp}`;
  document.getElementById('viewCasePerpetrator').innerText = c.perpetrator;
  document.getElementById('viewCaseKnownRel').innerText = `Relationship: ${c.relationship}`;
  document.getElementById('viewCaseStation').innerText = c.station.name;
  document.getElementById('viewCaseDescription').innerText = c.description;

  // Officer Profile
  document.getElementById('officerName').innerText = c.station.officer;
  document.getElementById('officerBadge').innerText = `Badge ${c.station.badge || '#CY-40982'}`;
  document.getElementById('officerUnit').innerText = c.station.division || 'Cyber Redressal Unit';
  document.getElementById('officerDeskPhone').innerText = c.station.phone || '+1 (555) 019-CYBER';
  document.getElementById('officerEmail').innerText = c.station.email || 'officer@cybercell.gov';
  if (c.station.avatar) {
    document.getElementById('officerAvatar').src = c.station.avatar;
  }

  // Evidence list in case view
  const evidenceContainer = document.getElementById('viewCaseEvidenceList');
  if (evidenceContainer) {
    evidenceContainer.innerHTML = c.evidence.map(ev => `
      <div class="bg-cyber-950 p-3 rounded-xl border border-cyber-800 flex items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2.5 truncate">
          <i class="fas ${ev.preview === 'video' ? 'fa-film text-cyber-cyan' : ev.preview === 'audio' ? 'fa-microphone text-purple-400' : 'fa-image text-emerald-400'}"></i>
          <span class="text-slate-200 font-medium truncate">${escapeHtml(ev.name)}</span>
          <span class="text-[10px] text-slate-500 font-mono">(${ev.size})</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[10px] font-mono text-slate-400 hidden sm:inline" title="${ev.hash}">SHA: ${ev.hash.substring(0, 12)}...</span>
          <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Sealed</span>
        </div>
      </div>
    `).join('');
  }

  // Render Officer Chat
  renderOfficerChat(c);
}

// Render Officer Chat Messages
function renderOfficerChat(c) {
  const windowEl = document.getElementById('officerChatWindow');
  if (!windowEl) return;

  windowEl.innerHTML = c.chatMessages.map(msg => {
    if (msg.sender === 'officer') {
      return `
        <div class="flex gap-2.5 items-start">
          <div class="w-7 h-7 rounded-full bg-cyber-cyan/20 text-cyber-cyan flex items-center justify-center font-bold text-[10px] shrink-0">
            <i class="fas fa-shield-halved"></i>
          </div>
          <div class="bg-cyber-800/80 text-slate-200 p-3 rounded-2xl rounded-tl-sm border border-cyber-700/60 max-w-[85%] space-y-1">
            <p class="font-bold text-[11px] text-cyber-cyan">${escapeHtml(msg.name)}:</p>
            <p class="leading-relaxed">${escapeHtml(msg.text)}</p>
            <span class="text-[10px] text-slate-400 block pt-0.5">${msg.time} • Official Dispatch</span>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="flex gap-2.5 items-start justify-end">
          <div class="bg-cyber-cyan text-cyber-950 p-3 rounded-2xl rounded-tr-sm max-w-[85%] space-y-1 shadow-md">
            <p class="font-bold text-[11px] text-slate-900">You (Complainant):</p>
            <p class="leading-relaxed font-medium">${escapeHtml(msg.text)}</p>
            <span class="text-[10px] text-cyber-900/80 block pt-0.5 text-right">${msg.time} • Sent</span>
          </div>
          <div class="w-7 h-7 rounded-full bg-cyber-800 text-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0">
            <i class="fas fa-user"></i>
          </div>
        </div>
      `;
    }
  }).join('');

  windowEl.scrollTop = windowEl.scrollHeight;
}

// Handle User Sending Message to Assigned Officer
function handleSendOfficerMessage(e) {
  e.preventDefault();
  const input = document.getElementById('officerMessageInput');
  const text = input.value.trim();
  if (!text) return;

  const currentCase = cases.find(item => item.id === activeCaseId);
  if (!currentCase) return;

  // Add user message
  const userMsg = {
    sender: "user",
    name: currentCase.victim.name,
    text: text,
    time: formatCurrentTime()
  };
  currentCase.chatMessages.push(userMsg);
  input.value = '';
  renderOfficerChat(currentCase);
  saveCases();

  // Simulated Officer Automated Realistic Reply
  setTimeout(() => {
    const officerReplies = [
      `Understood. I have logged this update to docket ${currentCase.id}. We are cross-referencing the handle ${currentCase.perpetrator} with known telecommunication carrier data.`,
      `Thank you for providing this additional detail. A preservation request has been queued to platform safety compliance. Please continue keeping your phone available for any verification call.`,
      `I see. We have marked this case with high priority. If the perpetrator attempts any physical contact or issues immediate real-time threats, call our direct line +1 (555) 019-CYBER or dial 1930 immediately.`,
      `Noted. Our forensic lab has verified the SHA-256 evidence hashes. They have been attached to the formal charge sheet.`
    ];

    const randomReply = officerReplies[Math.floor(Math.random() * officerReplies.length)];

    currentCase.chatMessages.push({
      sender: "officer",
      name: currentCase.station.officer,
      text: randomReply,
      time: formatCurrentTime()
    });

    renderOfficerChat(currentCase);
    saveCases();
  }, 1200);
}

// Render Nearest Stations Directory
function renderStationsGrid(filterText = '') {
  const grid = document.getElementById('stationsListGrid');
  if (!grid) return;

  const filtered = CYBER_STATIONS.filter(s => {
    if (!filterText) return true;
    const query = filterText.toLowerCase();
    return s.name.toLowerCase().includes(query) ||
           s.division.toLowerCase().includes(query) ||
           s.officer.toLowerCase().includes(query) ||
           s.address.toLowerCase().includes(query);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-500 text-xs">
        <i class="fas fa-building-circle-xmark text-3xl mb-2 text-slate-600 block"></i>
        No cyber police station found matching "${escapeHtml(filterText)}".
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(st => `
    <div class="bg-cyber-950 border border-cyber-800 rounded-2xl p-5 hover:border-cyber-cyan/50 transition flex flex-col justify-between space-y-4">
      <div>
        <div class="flex items-start justify-between gap-2 mb-2">
          <span class="bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
            <i class="fas fa-location-dot mr-1"></i> ${st.distance}
          </span>
          <span class="text-emerald-400 text-xs font-semibold flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Active Desk
          </span>
        </div>
        <h3 class="font-bold text-white text-base">${st.name}</h3>
        <p class="text-xs text-cyber-cyan font-medium mt-0.5">${st.division}</p>
        <p class="text-xs text-slate-400 mt-2"><i class="fas fa-map-pin mr-1.5 text-slate-500"></i> ${st.address}</p>
      </div>

      <div class="bg-cyber-900/90 p-3 rounded-xl border border-cyber-800 text-xs space-y-1.5">
        <div class="flex justify-between items-center">
          <span class="text-slate-400">Station Head:</span>
          <span class="text-slate-200 font-semibold">${st.officer}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-slate-400">Badge ID:</span>
          <span class="text-cyber-cyan font-mono">${st.badge}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-slate-400">Direct Helpline:</span>
          <span class="text-slate-200 font-mono font-bold">${st.phone}</span>
        </div>
      </div>

      <div class="flex flex-wrap gap-1.5">
        ${st.tags.map(t => `<span class="text-[10px] bg-cyber-900 text-slate-400 px-2 py-0.5 rounded border border-cyber-800">${t}</span>`).join('')}
      </div>

      <div class="pt-2 border-t border-cyber-800 flex gap-2">
        <button onclick="startReportWithStation('${st.name}')" class="w-full py-2 bg-cyber-800 hover:bg-cyber-700 text-cyber-cyan border border-cyber-cyan/30 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5">
          <i class="fas fa-file-export"></i> Lodge Case Here
        </button>
      </div>
    </div>
  `).join('');
}

function filterStations(query) {
  renderStationsGrid(query);
}

function detectUserLocation() {
  alert("Geolocating your local Cyber Crime Jurisdiction...\n\nDetected: Metro Central Zone (Accuracy: 98%)\nNearest Cyber Cell: Metro Central Cyber Crime Cell (2.4 km away).");
}

function startReportWithStation(stationName) {
  switchTab('report');
  goToStep(4);
  const radios = document.querySelectorAll('input[name="targetStation"]');
  radios.forEach(r => {
    if (r.value === stationName) r.checked = true;
  });
}

function startNewReport() {
  switchTab('report');
  goToStep(1);
}

// Printable FIR Modal Management
function openPrintableReport() {
  const c = cases.find(item => item.id === activeCaseId) || cases[0];
  if (!c) return;

  document.getElementById('firCaseId').innerText = c.id;
  document.getElementById('firStation').innerText = c.station.name;
  document.getElementById('firDate').innerText = c.timestamp;
  document.getElementById('firOfficer').innerText = c.station.officer;
  document.getElementById('firBadge').innerText = c.station.badge || '#CY-40982';
  document.getElementById('firVictimName').innerText = c.victim.name;
  document.getElementById('firVictimContact').innerText = c.victim.phone;
  document.getElementById('firVictimEmail').innerText = c.victim.email;
  document.getElementById('firSuspectHandle').innerText = c.perpetrator;
  document.getElementById('firPlatform').innerText = c.platforms.join(', ');
  document.getElementById('firRelationship').innerText = c.relationship;
  document.getElementById('firNarrative').innerText = c.description;

  const table = document.getElementById('firEvidenceTable');
  table.innerHTML = c.evidence.map(ev => `
    <tr class="border-b">
      <td class="p-1.5 border-r uppercase">${ev.preview}</td>
      <td class="p-1.5 border-r">${escapeHtml(ev.name)}</td>
      <td class="p-1.5 border-r font-mono text-[10px]">${ev.hash.substring(0, 24)}...</td>
      <td class="p-1.5 text-emerald-700 font-bold">VERIFIED</td>
    </tr>
  `).join('');

  document.getElementById('printableReportModal').classList.remove('hidden');
}

function closePrintableReport() {
  document.getElementById('printableReportModal').classList.add('hidden');
}

// Officer Call Simulator
function triggerOfficerCallModal() {
  document.getElementById('officerCallModal').classList.remove('hidden');
}

function closeOfficerCallModal() {
  document.getElementById('officerCallModal').classList.add('hidden');
}

// Emergency Panic Alert
function requestEmergencyAlert() {
  alert("EMERGENCY SIGNAL BROADCAST:\n\nHigh-priority panic alert sent to Metro Central Cyber Crime Cell Dispatch.\nA patrol unit and senior cyber inspector have been notified to initiate emergency contact and preservation protocols.");
}

// Quick Escape feature for victim safety
function quickEscape() {
  // Disguise screen as Wikipedia or Google Search
  window.location.href = "https://www.google.com";
}

function setupEscapeKey() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      quickEscape();
    }
  });
}

// Utilities
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function generatePseudoHash(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return hex + "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852" + hex;
}

function formatCurrentTime() {
  const d = new Date();
  const hrs = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${hrs}:${mins}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
