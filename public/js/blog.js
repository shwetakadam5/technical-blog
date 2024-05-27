const blogFormHandler = async (event) => {
  alert('HI I am in create blog');
  event.preventDefault();
  const response = await fetch('/api/dashboard/createblog/');
  if (response.ok) {
    document.location.replace(`/api/dashboard/createblog/`);
  } else {
    alert('Error');
  }
};

document
  .querySelector('.create-blog')
  .addEventListener('submit', blogFormHandler);
