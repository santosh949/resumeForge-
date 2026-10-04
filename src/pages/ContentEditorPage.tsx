import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import AIAssistant from '../components/AIAssistant';

// ─── Small reusable pieces ────────────────────────────────
function SectionCard({ title, icon, children, onAdd, addLabel }) {
    return (
        <div className="editor-section-card animate-fade-up">
            <div className="editor-section-header">
                <div className="editor-section-title-row">
                    <span className="editor-section-icon">{icon}</span>
                    <h2 className="editor-section-title">{title}</h2>
                </div>
                {onAdd && (
                    <button type="button" onClick={onAdd} className="editor-add-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        {addLabel || 'Add'}
                    </button>
                )}
            </div>
            <div className="editor-section-body">{children}</div>
        </div>
    );
}

function FieldRow({ label, value, onChange, placeholder, multiline }) {
    return (
        <div className="editor-field">
            <label className="editor-field-label">{label}</label>
            {multiline ? (
                <textarea className="editor-field-input" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} />
            ) : (
                <input className="editor-field-input" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            )}
        </div>
    );
}

function ListEditor({ items, onChange, placeholder }) {
    const update = (idx, val) => { const arr = [...items]; arr[idx] = val; onChange(arr); };
    const remove = (idx) => onChange(items.filter((_, i) => i !== idx));
    const add = () => onChange([...items, '']);
    return (
        <div className="editor-list">
            {items.map((item, idx) => (
                <div key={idx} className="editor-list-item">
                    <input className="editor-field-input" value={item} onChange={e => update(idx, e.target.value)} placeholder={placeholder} />
                    <button type="button" onClick={() => remove(idx)} className="editor-remove-btn" title="Remove">×</button>
                </div>
            ))}
            <button type="button" onClick={add} className="editor-add-inline-btn">+ Add item</button>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────
export default function ContentEditorPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const { isDark } = useTheme();

    const [data, setData] = useState(null);

    useEffect(() => {
        const incoming = location.state?.portfolioData;
        if (!incoming) {
            navigate('/upload');
            return;
        }
        // Deep clone to avoid mutating location state
        setData(JSON.parse(JSON.stringify(incoming)));
    }, [location.state, navigate]);

    if (!data) return null;

    // ─── Helpers to update nested state ───────────────
    const updateBio = (key, val) => setData(d => ({ ...d, bio: { ...d.bio, [key]: val } }));

    const updateExperience = (idx, key, val) => {
        setData(d => {
            const exp = [...d.experience];
            exp[idx] = { ...exp[idx], [key]: val };
            return { ...d, experience: exp };
        });
    };
    const removeExperience = (idx) => setData(d => ({ ...d, experience: d.experience.filter((_, i) => i !== idx) }));
    const addExperience = () => setData(d => ({
        ...d,
        experience: [...(d.experience || []), { company: '', role: '', duration: '', location: '', highlights: [], keywords: [] }]
    }));

    const updateProject = (idx, key, val) => {
        setData(d => {
            const p = [...d.projects];
            p[idx] = { ...p[idx], [key]: val };
            return { ...d, projects: p };
        });
    };
    const removeProject = (idx) => setData(d => ({ ...d, projects: d.projects.filter((_, i) => i !== idx) }));
    const addProject = () => setData(d => ({
        ...d,
        projects: [...(d.projects || []), { name: '', description: '', technologies: [], link: '', highlights: [] }]
    }));

    const updateSkill = (idx, key, val) => {
        setData(d => {
            const s = [...d.skills];
            s[idx] = { ...s[idx], [key]: val };
            return { ...d, skills: s };
        });
    };
    const removeSkill = (idx) => setData(d => ({ ...d, skills: d.skills.filter((_, i) => i !== idx) }));
    const addSkill = () => setData(d => ({
        ...d,
        skills: [...(d.skills || []), { category: '', items: [] }]
    }));

    const updateEducation = (idx, key, val) => {
        setData(d => {
            const e = [...d.education];
            e[idx] = { ...e[idx], [key]: val };
            return { ...d, education: e };
        });
    };
    const removeEducation = (idx) => setData(d => ({ ...d, education: d.education.filter((_, i) => i !== idx) }));
    const addEducation = () => setData(d => ({
        ...d,
        education: [...(d.education || []), { institution: '', degree: '', year: '', gpa: '', highlights: [] }]
    }));

    const handleContinue = () => {
        navigate('/portfolio', { state: { portfolioData: data }, replace: true });
    };

    // ─── Render ───────────────────────────────────────
    return (
        <div className="upload-root" data-theme={isDark ? 'dark' : 'light'}>
            {/* Background Orbs */}
            <div className="landing-orbs">
                <div className="landing-orb landing-orb-1" />
                <div className="landing-orb landing-orb-2" />
                <div className="landing-orb landing-orb-3" />
            </div>

            {/* Navbar */}
            <nav className="upload-nav">
                <div className="upload-nav-inner">
                    <div className="upload-nav-brand" onClick={() => navigate('/upload')} style={{ cursor: 'pointer' }}>
                        <div className="landing-logo">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                        <span className="landing-brand-text">ResumeForge</span>
                    </div>
                    <div className="upload-nav-actions">
                        <ThemeToggle />
                        {user && (
                            <div className="upload-user-section">
                                <img src={user.photoURL} alt="" className="upload-user-avatar" />
                                <button onClick={signOut} className="upload-signout-btn">Sign Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="editor-main">
                {/* Header */}
                <div className="editor-header animate-fade-up">
                    <div className="editor-header-badge">
                        <span className="editor-badge-dot" />
                        AI-Parsed · Review & Refine
                    </div>
                    <h1 className="editor-header-title">Perfect Your Portfolio Content</h1>
                    <p className="editor-header-subtitle">
                        Our AI has extracted the following from your resume. Review, edit, or add anything before generating your portfolio.
                    </p>
                </div>

                {/* ─── Bio Section ─── */}
                <SectionCard title="Personal Info" icon="👤">
                    <div className="editor-field-grid">
                        <FieldRow label="Full Name" value={data.bio?.name} onChange={v => updateBio('name', v)} placeholder="John Doe" />
                        <FieldRow label="Professional Title" value={data.bio?.title} onChange={v => updateBio('title', v)} placeholder="Full Stack Developer" />
                    </div>
                    <FieldRow label="Summary" value={data.bio?.summary} onChange={v => updateBio('summary', v)} placeholder="A brief professional summary…" multiline />
                    <div className="editor-field-grid">
                        <FieldRow label="Email" value={data.bio?.email} onChange={v => updateBio('email', v)} placeholder="you@email.com" />
                        <FieldRow label="Phone" value={data.bio?.phone} onChange={v => updateBio('phone', v)} placeholder="+1 234 567 890" />
                        <FieldRow label="Location" value={data.bio?.location} onChange={v => updateBio('location', v)} placeholder="City, Country" />
                        <FieldRow label="LinkedIn" value={data.bio?.linkedin} onChange={v => updateBio('linkedin', v)} placeholder="https://linkedin.com/in/..." />
                        <FieldRow label="GitHub" value={data.bio?.github} onChange={v => updateBio('github', v)} placeholder="https://github.com/..." />
                        <FieldRow label="Website" value={data.bio?.website} onChange={v => updateBio('website', v)} placeholder="https://yoursite.com" />
                    </div>
                </SectionCard>

                {/* ─── Experience Section ─── */}
                <SectionCard title="Experience" icon="💼" onAdd={addExperience} addLabel="Add Role">
                    {(data.experience || []).length === 0 && <p className="editor-empty-text">No experience entries yet.</p>}
                    {(data.experience || []).map((exp, idx) => (
                        <div key={idx} className="editor-entry-card">
                            <div className="editor-entry-header">
                                <span className="editor-entry-number">#{idx + 1}</span>
                                <button type="button" onClick={() => removeExperience(idx)} className="editor-remove-entry-btn">Remove</button>
                            </div>
                            <div className="editor-field-grid">
                                <FieldRow label="Company" value={exp.company} onChange={v => updateExperience(idx, 'company', v)} placeholder="Acme Inc." />
                                <FieldRow label="Role" value={exp.role} onChange={v => updateExperience(idx, 'role', v)} placeholder="Software Engineer" />
                                <FieldRow label="Duration" value={exp.duration} onChange={v => updateExperience(idx, 'duration', v)} placeholder="Jan 2022 - Present" />
                                <FieldRow label="Location" value={exp.location} onChange={v => updateExperience(idx, 'location', v)} placeholder="Remote" />
                            </div>
                            <div className="editor-field">
                                <label className="editor-field-label">Highlights</label>
                                <ListEditor items={exp.highlights || []} onChange={v => updateExperience(idx, 'highlights', v)} placeholder="Achievement or responsibility" />
                            </div>
                            <div className="editor-field">
                                <label className="editor-field-label">Keywords (metrics)</label>
                                <ListEditor items={exp.keywords || []} onChange={v => updateExperience(idx, 'keywords', v)} placeholder="e.g. $1M saved, 50% faster" />
                            </div>
                        </div>
                    ))}
                </SectionCard>

                {/* ─── Skills Section ─── */}
                <SectionCard title="Skills" icon="⚡" onAdd={addSkill} addLabel="Add Category">
                    {(data.skills || []).length === 0 && <p className="editor-empty-text">No skill categories yet.</p>}
                    {(data.skills || []).map((skill, idx) => (
                        <div key={idx} className="editor-entry-card">
                            <div className="editor-entry-header">
                                <FieldRow label="Category" value={skill.category} onChange={v => updateSkill(idx, 'category', v)} placeholder="Programming Languages" />
                                <button type="button" onClick={() => removeSkill(idx)} className="editor-remove-entry-btn">Remove</button>
                            </div>
                            <div className="editor-field">
                                <label className="editor-field-label">Skills</label>
                                <ListEditor items={skill.items || []} onChange={v => updateSkill(idx, 'items', v)} placeholder="React, TypeScript, …" />
                            </div>
                        </div>
                    ))}
                </SectionCard>

                {/* ─── Projects Section ─── */}
                <SectionCard title="Projects" icon="🚀" onAdd={addProject} addLabel="Add Project">
                    {(data.projects || []).length === 0 && <p className="editor-empty-text">No projects yet.</p>}
                    {(data.projects || []).map((proj, idx) => (
                        <div key={idx} className="editor-entry-card">
                            <div className="editor-entry-header">
                                <span className="editor-entry-number">#{idx + 1}</span>
                                <button type="button" onClick={() => removeProject(idx)} className="editor-remove-entry-btn">Remove</button>
                            </div>
                            <div className="editor-field-grid">
                                <FieldRow label="Project Name" value={proj.name} onChange={v => updateProject(idx, 'name', v)} placeholder="Portfolio Generator" />
                                <FieldRow label="Link" value={proj.link} onChange={v => updateProject(idx, 'link', v)} placeholder="https://…" />
                            </div>
                            <FieldRow label="Description" value={proj.description} onChange={v => updateProject(idx, 'description', v)} placeholder="Brief project description" multiline />
                            <div className="editor-field">
                                <label className="editor-field-label">Technologies</label>
                                <ListEditor items={proj.technologies || []} onChange={v => updateProject(idx, 'technologies', v)} placeholder="React, Node.js…" />
                            </div>
                            <div className="editor-field">
                                <label className="editor-field-label">Highlights</label>
                                <ListEditor items={proj.highlights || []} onChange={v => updateProject(idx, 'highlights', v)} placeholder="Key achievement" />
                            </div>
                        </div>
                    ))}
                </SectionCard>

                {/* ─── Education Section ─── */}
                <SectionCard title="Education" icon="🎓" onAdd={addEducation} addLabel="Add Entry">
                    {(data.education || []).length === 0 && <p className="editor-empty-text">No education entries yet.</p>}
                    {(data.education || []).map((edu, idx) => (
                        <div key={idx} className="editor-entry-card">
                            <div className="editor-entry-header">
                                <span className="editor-entry-number">#{idx + 1}</span>
                                <button type="button" onClick={() => removeEducation(idx)} className="editor-remove-entry-btn">Remove</button>
                            </div>
                            <div className="editor-field-grid">
                                <FieldRow label="Institution" value={edu.institution} onChange={v => updateEducation(idx, 'institution', v)} placeholder="MIT" />
                                <FieldRow label="Degree" value={edu.degree} onChange={v => updateEducation(idx, 'degree', v)} placeholder="B.S. Computer Science" />
                                <FieldRow label="Year" value={edu.year} onChange={v => updateEducation(idx, 'year', v)} placeholder="2024" />
                                <FieldRow label="GPA" value={edu.gpa} onChange={v => updateEducation(idx, 'gpa', v)} placeholder="3.9" />
                            </div>
                            <div className="editor-field">
                                <label className="editor-field-label">Highlights</label>
                                <ListEditor items={edu.highlights || []} onChange={v => updateEducation(idx, 'highlights', v)} placeholder="Awards, honors…" />
                            </div>
                        </div>
                    ))}
                </SectionCard>

                {/* ─── Bottom Actions ─── */}
                <div className="editor-actions animate-fade-up">
                    <button onClick={() => navigate('/upload')} className="btn-secondary" style={{ padding: '14px 28px' }}>
                        ← Back to Upload
                    </button>
                    <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 36px', fontSize: '1.05rem' }}>
                        ✨ Generate Portfolio
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-footer-inner">
                    <p className="landing-footer-copy">
                        © {new Date().getFullYear()} ResumeForge. Crafted with AI.
                    </p>
                </div>
            </footer>

            {/* AI Career Assistant */}
            <AIAssistant resumeData={data} isDark={isDark} />
        </div>
    );
}
