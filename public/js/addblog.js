const blogCreateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const userId = document.querySelector('#user_id').value.trim();
  const content = document.querySelector('#content').value.trim();

  if ((title, content, userId)) {
    const response = await fetch('/api/dashboard/addblog/', {
      method: 'POST',
      body: JSON.stringify({ title, content, userId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/api/dashboard/`);
    } else {
      alert('Error');
    }
  }
};

document
  .querySelector('.blog-form')
  .addEventListener('submit', blogCreateFormHandler);
