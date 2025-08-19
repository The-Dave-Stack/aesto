# Gemini Interaction Guidelines for The Dave Stack Ghost Theme

This document provides guidelines for interacting with the The Dave Stack Ghost Theme project using Gemini.

## About the Project

This project is the official Ghost theme for "The Dave Stack" website. It's a customized version of the Aesto theme, designed to be clean, content-focused, and fully responsive. The theme is built for the Ghost CMS and includes features like light/dark mode, multi-language support, and Ghost membership integration.

## Key Features

*   **Clean & Responsive Design**
*   **Lightweight & Optimized**
*   **Light & Dark Mode**
*   **Custom Color Palette & Typography**
*   **Instant Search**
*   **Disqus Comments**
*   **Full Ghost Membership Support**
*   **Multi-language Support**
*   **Advanced Navigation**
*   **Koenig Editor Features**
*   **Responsive Embeds**
*   **Reading Progress Bar**
*   **Table of Contents (ToC)**
*   **Image Lightbox**
*   **Custom Templates**
*   **Social Sharing**
*   **"Load More" Pagination**
*   **SEO Optimized**

## Getting Started

To work with this theme, you'll need to have a local Ghost installation or a running Ghost instance.

**Installation:**

1.  Download the latest version of the theme from the repository's "Releases" section.
2.  Log in to your Ghost site's admin panel.
3.  Go to `Design > Change theme`.
4.  Click `Upload theme` and select the theme's `.zip` file.
5.  Once uploaded, click `Activate`.

**Configuration:**

Theme options can be customized in the `package.json` file. This includes:

*   Language selector
*   Call to Action (CTA) texts
*   Featured tags on the homepage

## Development

To set up a local development environment:

1.  **Prerequisites:**
    *   Node.js
    *   Yarn
    *   Gulp CLI (`npm install --global gulp-cli`)

2.  **Setup:**
    *   Clone the repository.
    *   Install dependencies with `yarn install`.

3.  **Running Locally:**
    *   Use `yarn dev` to compile assets and watch for changes with LiveReload.

## Commands

Here are some useful commands for this project:

*   `yarn dev`: Starts the development server with live reloading.
*   `yarn zip`: Packages the theme into a `.zip` file for deployment.
*   `yarn test`: Runs `gscan` to validate the theme for errors and warnings.

When interacting with this project, please adhere to the existing coding style and conventions.
