document.addEventListener('DOMContentLoaded', () => {
    const rulesContainer = document.getElementById('rules-container');
    const repoName = 'cursor-rules'; // Your repository name

    const ruleFiles = [
        'standard-commit.md',
        'code-cleaner.md',
        'bug-fix-workflow.md',
        'pr-review.md',
        'implement-task.md',
        'code-analysis.md',
        'create-docs.md'
    ];

    const fetchAndDisplayRules = async () => {
        for (const file of ruleFiles) {
            // Construct the full path for GitHub Pages
            const filePath = `/${repoName}/rules/${file}`;
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${filePath} (status: ${response.status})`);
                }
                const text = await response.text();
                const rule = parseRule(text);
                displayRule(rule);
            } catch (error) {
                console.error('Error loading rule:', error);
            }
        }
    };

    const parseRule = (text) => {
        const frontmatterMatch = text.match(/---([\s\S]*?)---/);
        const content = text.replace(/---[\s\S]*?---/, '').trim();
        
        const rule = { content };
        if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(/title: "(.*?)"/);
            const descriptionMatch = frontmatter.match(/description: "(.*?)"/);
            if (titleMatch) rule.title = titleMatch[1];
            if (descriptionMatch) rule.description = descriptionMatch[1];
        }
        return rule;
    };

    const displayRule = (rule) => {
        const card = document.createElement('div');
        card.className = 'rule-card';

        const header = document.createElement('div');
        header.className = 'rule-card-header';
        
        const title = document.createElement('h2');
        title.textContent = rule.title || 'Untitled Rule';
        header.appendChild(title);

        if (rule.description) {
            const description = document.createElement('p');
            description.textContent = rule.description;
            header.appendChild(description);
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'rule-content';
        
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.textContent = rule.content;
        pre.appendChild(code);
        contentWrapper.appendChild(pre);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rule.content).then(() => {
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });
        contentWrapper.appendChild(copyBtn);
        
        card.appendChild(header);
        card.appendChild(contentWrapper);
        rulesContainer.appendChild(card);
    };

    fetchAndDisplayRules();
}); 