let currentTemplate = 1;

function startBuilding() {
  document.getElementById("landing-page").style.display = "none";
  document.getElementById("resume-builder").style.display = "flex";
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

function switchTemplate() {
  const preview = document.getElementById("cv-preview");
  currentTemplate = currentTemplate === 1 ? 2 : 1;
  preview.className = currentTemplate === 1 ? "template1" : "template2";
}

function addEducation() {
  const container = document.getElementById("edu-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Degree" />
    <input placeholder="Institution" />
    <input placeholder="Duration" />
    <input placeholder="Grade" />
  `;
  container.appendChild(div);
}

function addExperience() {
  const container = document.getElementById("exp-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Job Title" />
    <input placeholder="Company Name" />
    <input placeholder="Duration" />
    <textarea placeholder="Work Description"></textarea>
  `;
  container.appendChild(div);
}

function addProject() {
  const container = document.getElementById("proj-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Project Title" />
    <input placeholder="Link (optional)" />
    <textarea placeholder="Project Description"></textarea>
  `;
  container.appendChild(div);
}

function fillSampleData() {
  document.getElementById("nameField").value = "John Doe";
  document.getElementById("guardianField").value = "Jane Doe";
  document.getElementById("contactField").value = "1234567890";
  document.getElementById("emailField").value = "john@example.com";
  document.getElementById("addressField").value = "123 Main St, City";
  document.getElementById("githubField").value = "https://github.com/johndoe";
  document.getElementById("summaryField").value = "A motivated developer with a passion for creating impactful software.";
  document.getElementById("skillsField").value = "HTML, CSS, JavaScript";
  document.getElementById("languagesField").value = "English: Fluent, Hindi: Native";
  document.getElementById("hobbiesField").value = "Reading, Coding";
}

function generateCV() {
  const name = document.getElementById("nameField").value;
  const guardian = document.getElementById("guardianField").value;
  const contact = document.getElementById("contactField").value;
  const email = document.getElementById("emailField").value;
  const address = document.getElementById("addressField").value;
  const github = document.getElementById("githubField").value;
  const summary = document.getElementById("summaryField").value;
  const skills = document.getElementById("skillsField").value.split(',');
  const languages = document.getElementById("languagesField").value;
  const hobbies = document.getElementById("hobbiesField").value;
  const reader = new FileReader();
  const file = document.getElementById("imgField").files[0];

  reader.onloadend = function () {
    const image = file ? `<img src="${reader.result}" alt="Profile Photo">` : "";
    const eduHTML = [...document.querySelectorAll("#edu-container > div")].map(div => {
      const inputs = div.querySelectorAll("input");
      return `<p><strong>${inputs[0].value}</strong> (${inputs[2].value})<br>${inputs[1].value} - Grade: ${inputs[3].value}</p>`;
    }).join('');

    const expHTML = [...document.querySelectorAll("#exp-container > div")].map(div => {
      const [title, comp, dur, desc] = div.querySelectorAll("input, textarea");
      return `<p><strong>${title.value}</strong> (${dur.value})<br>${comp.value}<br>${desc.value}</p>`;
    }).join('');

    const projHTML = [...document.querySelectorAll("#proj-container > div")].map(div => {
      const [title, link, desc] = div.querySelectorAll("input, textarea");
      const projectLine = link.value ? `<a href="${link.value}" target="_blank">${title.value}</a>` : title.value;
      return `<p><strong>${projectLine}</strong><br>${desc.value}</p>`;
    }).join('');

    document.getElementById("cv-preview").innerHTML = `
      ${image}
      <h1>${name}</h1>
      <p><strong>Guardian:</strong> ${guardian}</p>
      <p><strong>Contact:</strong> ${contact} | <strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>
      <h2>Profile</h2><p>${summary}</p>
      <h2>Skills</h2><ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
      <h2>Languages</h2><p>${languages}</p>
      <h2>Hobbies</h2><p>${hobbies}</p>
      <h2>Education</h2>${eduHTML}
      <h2>Experience</h2>${expHTML}
      <h2>Projects</h2>${projHTML}
    `;
  };

  if (file) reader.readAsDataURL(file);
  else reader.onloadend();
}

function downloadPDF() {
  const cvElement = document.getElementById("cv-preview");
  const opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(cvElement).set(opt).save();
}
