import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AdBanner from './components/Ads/AdBanner.jsx'

// Render the main application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Add side ads to the content container
const contentElement = document.getElementById('content')
const leftAdContainer = document.createElement('div')
leftAdContainer.className = 'side-ad left-ad'
const rightAdContainer = document.createElement('div')
rightAdContainer.className = 'side-ad right-ad'

// Insert before and after the content
document.body.insertBefore(leftAdContainer, contentElement)
document.body.insertBefore(rightAdContainer, contentElement.nextSibling)

// Render ads into side containers
ReactDOM.createRoot(leftAdContainer).render(<AdBanner format="vertical" />)
ReactDOM.createRoot(rightAdContainer).render(<AdBanner format="vertical" />)