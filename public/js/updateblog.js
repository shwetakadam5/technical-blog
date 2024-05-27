const blogUpdateFormHandler = async (event) => {
  event.preventDefault();

  alert('update');
  const title = document.querySelector('#title').value.trim();
  const blogId = document.querySelector('#blog_id').value.trim();
  const content = document.querySelector('#content').value.trim();

  console.log('Hello I am in blogUpdateFormHandler');

  if ((title, content, blogId)) {
    const response = await fetch(`/api/dashboard/updateblog/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/api/dashboard/`);
    } else {
      alert('Error');
    }
  }
};

const blogDeleteFormHandler = async (event) => {
  event.preventDefault();

  alert('delete');
  const title = document.querySelector('#title').value.trim();
  const blogId = document.querySelector('#blog_id').value.trim();
  const content = document.querySelector('#content').value.trim();

  console.log('Hello I am in blogUpdateFormHandler');

  if ((title, content, blogId)) {
    const response = await fetch(`/api/dashboard/deleteblog/${blogId}`, {
      method: 'DELETE',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/api/dashboard/`);
    } else {
      alert('Error');
    }
  }
};
const updateButton = document.getElementById('updateBlog');
updateButton.addEventListener('click', blogUpdateFormHandler);

const deleteButton = document.getElementById('deleteBlog');
deleteButton.addEventListener('click', blogDeleteFormHandler);

// document
//   .querySelector('.blog-updateform')
//   .addEventListener('submit', blogUpdateFormHandler);
