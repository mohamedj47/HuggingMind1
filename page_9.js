document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('nav:nth-of-type(3)');
  const toggleBtn = document.querySelector('button[name="sidebar-toggle"]');
  const themeBtn = document.querySelector('button[aria-label="Toggle theme"]');
  
  toggleBtn.addEventListener('click', () => {
    const isCollapsed = sidebar.style.display === 'none';
    sidebar.style.display = isCollapsed ? 'grid' : 'none';
  });

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  console.log('HuggingChat UI initialized.');
});