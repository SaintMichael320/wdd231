// course.js - Course list display, filtering, and modal dialog

// ── COURSE DATA ──────────────────────────────────────────────
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true,
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands-on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree.',
    technology: ['HTML', 'CSS'],
    completed: true,
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will teach the design and implementation of functions using a current programming language. Functions are the building blocks of programs. By writing many functions to solve problems, students will develop the skill to think in small pieces that can be combined to solve complex problems.',
    technology: ['Python'],
    completed: true,
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the principles of object-oriented programming. Students will learn to write programs that take advantage of the object model with class definitions, methods, and inheritance.',
    technology: ['C#'],
    completed: false,
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true,
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false,
  },
];

// ── STATE ────────────────────────────────────────────────────
let currentFilter = 'all';

// ── HELPERS ──────────────────────────────────────────────────
function getFilteredCourses(filter) {
  if (filter === 'all') return courses;
  return courses.filter(c => c.subject.toLowerCase() === filter.toLowerCase());
}

function getTotalCredits(courseList) {
  return courseList.reduce((sum, c) => sum + c.credits, 0);
}

// ── RENDER COURSES ───────────────────────────────────────────
function renderCourses(filter) {
  const courseListEl = document.getElementById('course-list');
  const creditsTotal = document.getElementById('credits-total');
  if (!courseListEl) return;

  const filtered = getFilteredCourses(filter);
  const total = getTotalCredits(filtered);

  // Build cards as clickable buttons (was <div> — changed to <button>
  // so they are keyboard-accessible and semantically correct for click actions)
  courseListEl.innerHTML = '';

  filtered.forEach(course => {
    const courseDiv = document.createElement('button');
    courseDiv.classList.add('course-card', course.completed ? 'completed' : 'incomplete');
    courseDiv.setAttribute('role', 'listitem');
    courseDiv.setAttribute(
      'aria-label',
      `${course.subject} ${course.number}: ${course.title}, ${course.credits} credits${course.completed ? ', completed' : ''}. Click for details.`
    );
    courseDiv.textContent = `${course.subject} ${course.number}`;

    // ── Click listener — calls displayCourseDetails with this course's data
    courseDiv.addEventListener('click', () => {
      displayCourseDetails(course);
    });

    courseListEl.appendChild(courseDiv);
  });

  if (creditsTotal) {
    creditsTotal.innerHTML = `Total Credits: <span>${total}</span>`;
  }
}

// ── MODAL: DISPLAY FUNCTION ──────────────────────────────────
function displayCourseDetails(course) {
  const courseDetails = document.getElementById('course-details');
  if (!courseDetails) return;

  // Clear previous content and rebuild
  courseDetails.innerHTML = `
    <button id="closeModal" aria-label="Close course details">&#10005;</button>

    <div class="modal-header ${course.completed ? 'modal-header--complete' : 'modal-header--incomplete'}">
      <span class="modal-badge">${course.subject}</span>
      <h2 id="modal-course-code">${course.subject} ${course.number}</h2>
      <p class="modal-status">
        ${course.completed
          ? '<span class="status-complete">&#10003; Completed</span>'
          : '<span class="status-incomplete">&#9632; In Progress / Upcoming</span>'
        }
      </p>
    </div>

    <div class="modal-body">
      <h3 class="modal-title">${course.title}</h3>

      <dl class="modal-meta">
        <div class="modal-meta-row">
          <dt>Credits</dt>
          <dd>${course.credits}</dd>
        </div>
        <div class="modal-meta-row">
          <dt>Certificate</dt>
          <dd>${course.certificate}</dd>
        </div>
      </dl>

      <p class="modal-description">${course.description}</p>

      <div class="modal-tech">
        <p class="modal-tech-label">Technologies</p>
        <div class="modal-tech-chips">
          ${course.technology.map(t => `<span class="modal-chip">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  // Open the modal
  courseDetails.showModal();

  // ── Close via ✕ button
  document.getElementById('closeModal').addEventListener('click', () => {
    courseDetails.close();
  });

  // ── Close when clicking outside (on the ::backdrop)
  courseDetails.addEventListener('click', function onBackdropClick(e) {
    const rect = courseDetails.getBoundingClientRect();
    const clickedOutside =
      e.clientX < rect.left  ||
      e.clientX > rect.right ||
      e.clientY < rect.top   ||
      e.clientY > rect.bottom;

    if (clickedOutside) {
      courseDetails.close();
      // Remove listener so it doesn't stack on next open
      courseDetails.removeEventListener('click', onBackdropClick);
    }
  });
}

// ── FILTER BUTTONS ───────────────────────────────────────────
function setupFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btns button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      buttons.forEach(b => {
        b.classList.remove('active-filter');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active-filter');
      btn.setAttribute('aria-pressed', 'true');
      renderCourses(currentFilter);
    });
  });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupFilterButtons();
  renderCourses('all');
});