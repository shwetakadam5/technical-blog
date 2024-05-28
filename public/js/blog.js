const blogFormHandler = async (event) => {
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
