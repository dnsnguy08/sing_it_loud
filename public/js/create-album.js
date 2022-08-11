async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const artist = document.querySelector('input[name="post-artist"]').value;
    const genre = document.querySelector('input[name="post-genre"]').value;
    const album_content = document.querySelector('input[name="post-content"]').value;
  
    const response = await fetch(`/api/albums`, {
      method: 'POST',
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
      
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);