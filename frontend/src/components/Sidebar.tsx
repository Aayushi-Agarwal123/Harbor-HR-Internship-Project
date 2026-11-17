import { navItems, type NavId } from "../data/synthetic";
import { Icon } from "./Icons";

interface SidebarProps {
  current: NavId | null;
  onNavigate: (id: NavId) => void;
  onLogout: () => void;
}

export function Sidebar({ current, onNavigate, onLogout }: SidebarProps) {
  return (
    <aside className="sidebar">
      <p className="wordmark">Harbor HR</p>
      <label className="search-label" htmlFor="nav-search">
        <Icon name="search" />
        Search
      </label>
      <input id="nav-search" placeholder="Search" disabled title="Sidebar Search was visible. No search request or result was recorded." />
      <nav aria-label="Sidepanel">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={item.id === current ? "nav-current" : undefined}
                aria-current={item.id === current ? "page" : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.id} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" className="text-button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}
