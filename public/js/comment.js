const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();
  const blogId = document.querySelector('#blog_id').value.trim();

  console.log('Hello I am in commentFormHandler');

  console.log(comment);
  console.log(blogId);

  if (comment) {
    const response = await fetch('/api/blogs/comment', {
      method: 'POST',
      body: JSON.stringify({ comment, blogId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/api/blogs/${blogId}`);
    } else {
      alert('Error');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
