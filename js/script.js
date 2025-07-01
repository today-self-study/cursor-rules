document.addEventListener('DOMContentLoaded', () => {
    const rulesContainer = document.getElementById('rules-container');
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

    const fetchAndDisplayRules = async () => {
        for (const file of ruleFiles) {
            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error(`Failed to fetch ${file}`);
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

        // 카드 헤더(제목+Copy 버튼) flex row
        const header = document.createElement('div');
        header.className = 'rule-card-header';

        const title = document.createElement('h2');
        title.textContent = rule.title || 'Untitled Rule';

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

        header.appendChild(title);
        header.appendChild(copyBtn);
        card.appendChild(header);

        if (rule.description) {
            const description = document.createElement('p');
            description.textContent = rule.description;
            card.appendChild(description);
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'rule-content';

        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.textContent = rule.content;
        pre.appendChild(code);
        contentWrapper.appendChild(pre);

        card.appendChild(contentWrapper);
        rulesContainer.appendChild(card);
    };

    fetchAndDisplayRules();
}); 
