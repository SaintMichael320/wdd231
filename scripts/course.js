// course.js - Course list display and filtering

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming...',
    technology: ['Python'],
    completed: true,
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web...',
    technology: ['HTML', 'CSS'],
    completed: true,
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will teach the proper use of functions...',
    technology: ['Python'],
    completed: true,
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the principles of OOP...',
    technology: ['C#'],
    completed: false,
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on Web Fundamentals...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true,
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will teach students modern frontend...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false,
  },
];

// Current filter state
let currentFilter = 'all';

function getFilteredCourses(filter) {
  if (filter === 'all') return courses;
  return courses.filter(c => c.subject.toLowerCase() === filter.toLowerCase());
}

function getTotalCredits(courseList) {
  return courseList.reduce((sum, c) => sum + c.credits, 0);
}

function renderCourses(filter) {
  const courseList = document.getElementById('course-list');
  const creditsTotal = document.getElementById('credits-total');
  if (!courseList) return;

  const filtered = getFilteredCourses(filter);
  const total = getTotalCredits(filtered);

  courseList.innerHTML = filtered
    .map(
      c => `<div class="course-card ${c.completed ? 'completed' : 'incomplete'}"
          role="listitem"
          aria-label="${c.subject} ${c.number}: ${c.title}, ${c.credits} credits${c.completed ? ', completed' : ''}">
        ${c.subject} ${c.number}
      </div>`
    )
    .join('');

  if (creditsTotal) {
    creditsTotal.innerHTML = `Total Credits: <span>${total}</span>`;
  }
}

// Filter button logic
function setupFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btns button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      buttons.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      renderCourses(currentFilter);
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  setupFilterButtons();
  renderCourses('all');
});