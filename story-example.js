/**
 * Example: Extending the All In Story
 * 
 * This file demonstrates how to add custom passages and story logic
 * to the gambling awareness experience.
 * 
 * To use: Include this script in index.html after twine-engine.js
 * <script src="story-example.js"></script>
 */

// Wait for the Twine engine to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Story Example: Adding custom passages...');

    // Example 1: Add a new passage about understanding odds
    TwineHelpers.createPassage(
        'understanding-odds',
        'Understanding the Odds',
        `
            <p>Most people don't realize that gambling odds are designed to favor the house.</p>
            <p>For example, in roulette, even when you bet on red or black, the house edge is about 5.26% due to the green zero slots.</p>
        `,
        [
            { text: 'Learn about slot machines', target: 'slot-machines' },
            { text: 'Return to start', target: 'start' }
        ]
    );

    // Example 2: Add a passage about slot machines
    TwineHelpers.createPassage(
        'slot-machines',
        'The Truth About Slot Machines',
        `
            <p>Slot machines are programmed with a Return to Player (RTP) rate, typically around 90-95%.</p>
            <p>This means for every $100 wagered, the machine returns $90-95 on average, keeping $5-10.</p>
            <p>The random number generator ensures the house always wins in the long run.</p>
        `,
        [
            { text: 'Learn about betting patterns', target: 'betting-patterns' },
            { text: 'Back to understanding odds', target: 'understanding-odds' }
        ]
    );

    // Example 3: Add a passage about betting patterns
    TwineHelpers.createPassage(
        'betting-patterns',
        'Common Betting Patterns',
        `
            <p>Many gamblers fall into the "gambler's fallacy" - believing past events affect future outcomes.</p>
            <p>For example, thinking that after 5 red spins, black is "due" to come up. Each spin is independent.</p>
        `,
        [
            { text: 'Learn about resources', target: 'resources' },
            { text: 'Start over', target: 'start' }
        ]
    );

    // Example 4: Add a resources passage
    TwineHelpers.createPassage(
        'resources',
        'Getting Help',
        `
            <p>If you or someone you know has a gambling problem, help is available:</p>
            <ul style="margin-left: 2rem; line-height: 2;">
                <li>National Problem Gambling Helpline: 1-800-522-4700</li>
                <li>Gamblers Anonymous: <a href="https://www.gamblersanonymous.org" target="_blank">www.gamblersanonymous.org</a></li>
                <li>National Council on Problem Gambling: <a href="https://www.ncpgambling.org" target="_blank">www.ncpgambling.org</a></li>
            </ul>
        `,
        [
            { text: 'Return to start', target: 'start' }
        ]
    );

    // Example 5: Add more choices to the existing "choice1" passage
    TwineHelpers.addChoice('choice1', 'Learn about gambling odds', 'understanding-odds');
    TwineHelpers.addChoice('choice1', 'Find resources for help', 'resources');

    // Example 6: Track user progress with variables
    Story.setVariable('passagesVisited', 0);

    // Listen for passage changes to update progress
    const originalShowPassage = Story.showPassage.bind(Story);
    Story.showPassage = function(passageName) {
        originalShowPassage(passageName);
        
        // Increment counter
        const visited = Story.getVariable('passagesVisited') || 0;
        Story.setVariable('passagesVisited', visited + 1);
        
        console.log(`Total passages visited: ${visited + 1}`);
    };

    console.log('Story Example: Custom passages added successfully!');
});
