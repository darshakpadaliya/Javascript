function fetchRandomQuote() {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        const quote = data.content;
        document.getElementById("quote").textContent = quote;
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
  }
  
  document.getElementById("new-quote").addEventListener("click", fetchRandomQuote);
  fetchRandomQuote();