import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/sidebar.css';
import homeIcon from '../assets/icon/home.svg';
import taskIcon from '../assets/icon/task.svg';
import settingIcon from '../assets/icon/setting.svg';
import newsIcon from '../assets/icon/news.svg';
import helpIcon from '../assets/icon/help.svg';

interface NavItem {
	id: string;
	label: string;
	icon: string;
}

export const SideBar: React.FC = () => {
	const [activeItem, setActiveItem] = useState('home');

	const navItems: NavItem[] = [
		{
			id: 'home',
			label: '主页',
			icon: homeIcon,
		},
		{
			id: 'tasks',
			label: '任务',
			icon: taskIcon,
		},
		{
			id: 'settings',
			label: '设置',
			icon: settingIcon,
		},
		{
			id: 'news',
			label: '资讯',
			icon: newsIcon,
		},
		{
			id: 'help',
			label: '帮助',
			icon: helpIcon,
		},
	];

	const handleminimize = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();

        if ((window as any).pywebview?.api) {
            (window as any).pywebview.api.minimize_window();
        }
    };

	const handleclose = () => {
		(window as any).pywebview.api.close_window();
	};

	return (
		<div className="sidebar">
			<div className="sidebar-brand">
				<div className="brand-logo">E</div>
				<div className="brand-text">
					<span className="brand-title">明日方舟-难道说</span>
					<span className="brand-subtitle">打灰小帮手</span>
				</div>
			</div>

			<nav className="sidebar-nav">
				{navItems.map((item) => (
					<button key={item.id} className={`nav-item ${activeItem === item.id ? 'active' : ''}`} onClick={() => setActiveItem(item.id)}>
						<span className="nav-icon">
							<img src={item.icon} alt={item.label} className="nav-icon-img" />
						</span>
						<span className="nav-label">{item.label}</span>
					</button>
				))}
			</nav>

			<div className="sidebar-footer">
				<div className="window-controls">
					<button onClick={handleclose} className="control-btn close" title="关闭">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};
