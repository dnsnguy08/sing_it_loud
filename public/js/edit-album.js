async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const artist = document.querySelector('input[name="post-artist"]').value;
    const genre = document.querySelector('input[name="post-genre"]').value;
    const album_content = document.querySelector('input[name="post-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/albums/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            artist,
            genre,
            album_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
          console.log(artist);
          
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);