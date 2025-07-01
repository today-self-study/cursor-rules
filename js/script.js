document.addEventListener('DOMContentLoaded', () => {
    const rulesContainer = document.getElementById('rules-container');
    const owner = 'today-self-study';
    const repo = 'cursor-rules';

    const ruleFiles = [
        'rules/standard-commit.md',
        'rules/code-cleaner.md',
        'rules/bug-fix-workflow.md',
        'rules/pr-review.md',
        'rules/implement-task.md',
        'rules/code-analysis.md',
        'rules/create-docs.md',
        'rules/kent-becks-tdd-system-prompt.md'
    ];

    function base64ToUtf8(str) {
        return new TextDecoder('utf-8').decode(Uint8Array.from(atob(str), c => c.charCodeAt(0)));
    }

    const fetchAndDisplayRules = async () => {
        for (const filePath of ruleFiles) {
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch from GitHub API: ${apiUrl} (status: ${response.status})`);
                }
                const data = await response.json();
                const decodedContent = base64ToUtf8(data.content);
                const rule = parseRule(decodedContent);
                displayRule(rule);
            } catch (error) {
                console.error('Error loading rule via GitHub API:', error);
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
