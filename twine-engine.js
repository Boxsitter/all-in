/**
 * Twine Core Engine
 * Simple narrative engine for interactive storytelling
 * Manages passage navigation and story state
 */

(function() {
    'use strict';

    // Story state management
    const Story = {
        currentPassage: 'start',
        history: [],
        variables: {},
        
        /**
         * Initialize the story engine
         */
        init: function() {
            this.showPassage(this.currentPassage);
            this.attachEventListeners();
            console.log('Twine Core Engine initialized');
        },

        /**
         * Display a specific passage
         * @param {string} passageName - The name of the passage to display
         */
        showPassage: function(passageName) {
            // Hide all passages
            const passages = document.querySelectorAll('.passage');
            passages.forEach(passage => {
                passage.classList.remove('active');
            });

            // Show the target passage
            const targetPassage = document.querySelector(`[data-passage="${passageName}"]`);
            if (targetPassage) {
                targetPassage.classList.add('active');
                this.currentPassage = passageName;
                this.history.push(passageName);
                
                // Scroll to top of content
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                console.log(`Navigated to passage: ${passageName}`);
            } else {
                console.error(`Passage not found: ${passageName}`);
            }
        },

        /**
         * Attach event listeners to choice buttons
         */
        attachEventListeners: function() {
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('choice-btn')) {
                    const targetPassage = e.target.getAttribute('data-target');
                    if (targetPassage) {
                        this.showPassage(targetPassage);
                    }
                }
            });
        },

        /**
         * Get the current passage name
         * @returns {string} Current passage name
         */
        getCurrentPassage: function() {
            return this.currentPassage;
        },

        /**
         * Get story history
         * @returns {Array} Array of visited passage names
         */
        getHistory: function() {
            return this.history;
        },

        /**
         * Set a story variable
         * @param {string} key - Variable name
         * @param {*} value - Variable value
         */
        setVariable: function(key, value) {
            this.variables[key] = value;
            console.log(`Variable set: ${key} = ${value}`);
        },

        /**
         * Get a story variable
         * @param {string} key - Variable name
         * @returns {*} Variable value or undefined
         */
        getVariable: function(key) {
            return this.variables[key];
        },

        /**
         * Reset the story to the beginning
         */
        restart: function() {
            this.currentPassage = 'start';
            this.history = [];
            this.variables = {};
            this.showPassage('start');
            console.log('Story restarted');
        }
    };

    // Expose Story API globally for custom scripts
    window.Story = Story;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Story.init());
    } else {
        Story.init();
    }

    // Helper functions for story creators
    window.TwineHelpers = {
        /**
         * Create a new passage dynamically
         * @param {string} name - Passage name
         * @param {string} title - Passage title
         * @param {string} content - Passage content HTML
         * @param {Array} choices - Array of choice objects {text, target}
         */
        createPassage: function(name, title, content, choices = []) {
            const passagesContainer = document.getElementById('passages');
            const passage = document.createElement('div');
            passage.className = 'passage';
            passage.setAttribute('data-passage', name);

            let choicesHTML = '';
            if (choices.length > 0) {
                choicesHTML = '<div class="choices">';
                choices.forEach(choice => {
                    choicesHTML += `<button class="choice-btn" data-target="${choice.target}">${choice.text}</button>`;
                });
                choicesHTML += '</div>';
            }

            passage.innerHTML = `
                <h2>${title}</h2>
                <div class="content">${content}</div>
                ${choicesHTML}
            `;

            passagesContainer.appendChild(passage);
            console.log(`Passage created: ${name}`);
        },

        /**
         * Add a choice to an existing passage
         * @param {string} passageName - Target passage name
         * @param {string} choiceText - Choice button text
         * @param {string} targetPassage - Target passage for this choice
         */
        addChoice: function(passageName, choiceText, targetPassage) {
            const passage = document.querySelector(`[data-passage="${passageName}"]`);
            if (passage) {
                let choicesDiv = passage.querySelector('.choices');
                if (!choicesDiv) {
                    choicesDiv = document.createElement('div');
                    choicesDiv.className = 'choices';
                    passage.appendChild(choicesDiv);
                }

                const button = document.createElement('button');
                button.className = 'choice-btn';
                button.setAttribute('data-target', targetPassage);
                button.textContent = choiceText;
                choicesDiv.appendChild(button);
                
                console.log(`Choice added to ${passageName}: "${choiceText}" -> ${targetPassage}`);
            }
        }
    };

})();
