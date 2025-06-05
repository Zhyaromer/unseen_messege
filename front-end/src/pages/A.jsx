import { useState, useEffect, useRef } from 'react';

const LinkPreview = () => {
  const [inputValue, setInputValue] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Handle paste event
  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    const urlMatch = pastedText.match(/(https?:\/\/[^\s]+)/g);
    
    if (urlMatch && urlMatch[0]) {
      const url = urlMatch[0];
      setInputValue(url);
      fetchLinkPreview(url);
    }
  };

  // Fetch link preview data
  const fetchLinkPreview = async (url) => {
    setIsLoading(true);
    try {
      // You'll need a backend API or proxy to fetch metadata due to CORS
      const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.title || data.image) {
        setPreviewData({
          url,
          title: data.title || 'No title available',
          image: data.image || null,
          description: data.description || '',
        });
      }
    } catch (error) {
      console.error('Error fetching link preview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Alternatively, you can use a client-side solution (limited due to CORS)
  const fetchLinkPreviewClientSide = async (url) => {
    setIsLoading(true);
    try {
      // This will only work for URLs that allow CORS
      const response = await fetch(url, { mode: 'no-cors' });
      const html = await response.text();
      
      // Parse the HTML to extract metadata
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const title = doc.querySelector('title')?.textContent || 'No title available';
      const image = doc.querySelector('meta[property="og:image"]')?.content || 
                   doc.querySelector('meta[name="twitter:image"]')?.content || null;
      const description = doc.querySelector('meta[property="og:description"]')?.content || 
                         doc.querySelector('meta[name="description"]')?.content || '';
      
      setPreviewData({
        url,
        title,
        image,
        description,
      });
    } catch (error) {
      console.error('Error fetching link preview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearPreview = () => {
    setPreviewData(null);
    setInputValue('');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="link-input" className="block text-sm font-medium text-gray-700 mb-1">
          Paste a URL
        </label>
        <input
          ref={inputRef}
          id="link-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPaste={handlePaste}
          placeholder="Paste a link here"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {previewData && !isLoading && (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <a 
            href={previewData.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            {previewData.image && (
              <div className="h-40 bg-gray-100 overflow-hidden">
                <img
                  src={previewData.image}
                  alt={previewData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                {previewData.title}
              </h3>
              {previewData.description && (
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                  {previewData.description}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-400 truncate">
                {new URL(previewData.url).hostname}
              </p>
            </div>
          </a>
          <button
            onClick={clearPreview}
            className="w-full py-2 bg-gray-100 text-xs text-gray-500 hover:bg-gray-200 transition-colors"
          >
            Remove Preview
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkPreview;