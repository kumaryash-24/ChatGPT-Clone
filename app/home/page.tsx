// app/home/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Search,
  Book,
  Bot,
  SquareGanttChart,
  Plus,
  Sparkles,
  Mic,
  ChevronDown,
  Settings,
  History,
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  MessageSquareDiff,
  Share2,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Pencil,
  RotateCw,
  Check,
} from 'lucide-react';
import { getCurrentUser, removeCurrentUser, User } from '@/lib/auth';

interface ChatMessage {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
}

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProvider, setUserProvider] = useState<string | null>(null);
  const [isChatGPTOpen, setIsChatGPTOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserName(currentUser.name);
      setUserEmail(currentUser.email);
      setUserProvider(currentUser.provider);

      if (messages.length === 0) {
        setMessages([
          { id: 1, sender: 'user', text: 'hello' },
          { id: 2, sender: 'assistant', text: "Hey! How's it going?" },
        ]);
      }
    } else {
      router.replace('/login');
    }
  }, [router, messages.length]);

  const handleLogout = () => {
    removeCurrentUser();
    setUserName(null);
    setUserEmail(null);
    setUserProvider(null);
    router.push('/login');
  };

  if (userName === null) {
    return <div className="min-h-screen d-flex align-items-center justify-content-center chat-sidebar-bg dark-text-gray-200">Loading...</div>;
  }

  return (
    <div className="d-flex h-screen chat-sidebar-bg dark-text-gray-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 d-flex flex-column chat-sidebar-bg border-end chat-border-gray-700 flex-shrink-0">
        {/* Top Section - ChatGPT Dropdown and New Chat Button */}
        <div className="p-3 d-flex align-items-center justify-content-between border-bottom chat-border-gray-700">
          <div className="d-flex align-items-center gap-2">
            <svg className="w-7 h-7" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.5 16.6667C37.5 16.5168 37.5 16.3669 37.5 16.217C37.5 16.0921 37.5 15.9672 37.5 15.8423L37.4999 15.6924C37.4988 15.6091 37.4957 15.5259 37.4905 15.4428C37.4712 15.127 37.4194 14.8123 37.3353 14.5029C37.2917 14.3392 37.2346 14.1772 37.1643 14.017C37.0422 13.7431 36.8778 13.4839 36.6749 13.2435C36.6022 13.1565 36.5255 13.072 36.4447 12.9904L36.3331 12.8715C36.2163 12.7441 36.0963 12.6206 35.973 12.5012C35.9177 12.4468 35.8617 12.3929 35.8052 12.3396C35.6322 12.1649 35.4501 11.999 35.2603 11.8437C35.2125 11.8037 35.1639 11.7643 35.1147 11.7256L35.0069 11.6375C34.9392 11.5833 34.8708 11.5302 34.8016 11.4782C34.6288 11.352 34.4497 11.2344 34.2652 11.1256C34.1923 11.0827 34.1189 11.0405 34.0452 10.999L33.9184 10.9272C33.7456 10.8306 33.5678 10.7432 33.3855 10.6652C33.2754 10.6186 33.1647 10.5746 33.0537 10.5332L32.969 10.5019C32.8646 10.4632 32.7597 10.4269 32.6545 10.3931C32.5539 10.3609 32.453 10.3299 32.3517 10.3001C32.2217 10.2618 32.0898 10.229 31.9563 10.2017C31.8419 10.1783 31.7272 10.1554 31.6121 10.1332C31.439 10.0991 31.2644 10.0664 31.0886 10.0347C30.9385 10.0076 30.788 9.98094 30.6373 9.9547C30.421 9.9185 30.2036 9.8824 29.9856 9.847C29.7423 9.8082 29.4975 9.7719 29.2519 9.7397C29.0763 9.7153 28.9004 9.6917 28.7242 9.6688C28.4713 9.6358 28.2173 9.6053 27.9626 9.5772C27.705 9.5489 27.4468 9.5215 27.1882 9.4952L27.1881 9.4951C27.0544 9.4809 26.9205 9.4674 26.7863 9.4547L26.6859 9.4451C26.5414 9.4323 26.3967 9.4199 26.2517 9.4082C26.103 9.3953 25.954 9.3828 25.8048 9.3708C25.642 9.3575 25.479 9.3446 25.3157 9.332C25.176 9.3204 25.0361 9.3093 24.896 9.2985C24.717 9.2842 24.5379 9.2704 24.3585 9.257C24.1611 9.242 23.9634 9.2273 23.7655 9.213C23.6496 9.2046 23.5336 9.1965 23.4174 9.1887C23.238 9.1769 23.0583 9.1654 22.8785 9.1541C22.7503 9.1456 22.622 9.1373 22.4936 9.1292C22.2859 9.1166 22.078 9.1042 21.8701 9.0921C21.7824 9.0867 21.6946 9.0815 21.6068 9.0764C21.5034 9.0702 21.4001 9.0642 21.2968 9.0583C21.1713 9.0513 21.0458 9.0445 20.9202 9.0378C20.7675 9.0294 20.6148 9.0211 20.462 9.013C20.3082 9.0048 20.1544 8.9967 20 8.9887V13.7502H16.25V9.32356C16.143 9.31751 16.0361 9.31173 15.9292 9.30612C15.8209 9.30034 15.7126 9.29467 15.6044 9.28912C15.4228 9.27976 15.2412 9.27052 15.0596 9.26141C14.9427 9.25553 14.8258 9.24976 14.7088 9.24409C14.5097 9.23432 14.3106 9.22466 14.1115 9.21511C13.9859 9.20894 13.8603 9.20288 13.7348 9.19692C13.5656 9.18841 13.3965 9.17999 13.2274 9.17169C13.0673 9.1639 12.9073 9.15622 12.7472 9.14864C12.6078 9.14197 12.4684 9.13539 12.329 9.12891C12.1627 9.12102 11.9964 9.11322 11.8301 9.10553C11.7208 9.10023 11.6116 9.09503 11.5024 9.08993C11.3093 9.08099 11.1162 9.07216 10.9231 9.06342C10.7424 9.0553 10.5618 9.04727 10.3812 9.03935C10.2311 9.03268 10.081 9.0261 9.93091 9.01962C9.74239 9.01103 9.55387 9.00253 9.36534 8.99411C9.1192 8.98305 8.87305 8.9721 8.6269 8.96124C8.36979 8.94975 8.11268 8.93836 7.85556 8.92707C7.69708 8.92026 7.5386 8.91357 7.38012 8.90698C7.15197 8.89745 6.92383 8.88799 6.69568 8.8786C6.51375 8.87114 6.33182 8.86377 6.14989 8.85648C5.97686 8.84959 5.80384 8.84279 5.63081 8.83608C5.46794 8.82987 5.30507 8.82373 5.1422 8.81766C4.94586 8.81014 4.74952 8.80268 4.55318 8.7953C4.40939 8.78972 4.26561 8.78418 4.12182 8.77873C3.96024 8.77259 3.79867 8.76652 3.63709 8.76054C3.47352 8.75442 3.30995 8.74836 3.14638 8.74237C2.96985 8.73573 2.79332 8.72915 2.61679 8.72265C2.47953 8.71746 2.34228 8.71233 2.20502 8.70726L2.10091 8.70327C2.0157 8.70007 1.93049 8.69687 1.84527 8.69375C1.65082 8.68656 1.45637 8.67944 1.26192 8.6724L1.13429 8.66779C1.0402 8.66442 0.946107 8.66107 0.852018 8.65775C0.686644 8.65178 0.521269 8.64585 0.355895 8.63996C0.298031 8.63784 0.240167 8.63574 0.182303 8.63365L0 8.62771V20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20H37.5C37.5 20.081 37.5 20.162 37.5 20.243V20C37.5 19.3333 37.5 18.6667 37.5 18H37.5L37.5 16.6667Z" fill="currentColor"/>
            </svg>

            <div className="position-relative">
              <button
                onClick={() => setIsChatGPTOpen(!isChatGPTOpen)}
                className="btn btn-link text-white text-lg font-semibold p-1 rounded-3 transition-colors d-flex align-items-center"
              >
                ChatGPT <ChevronDown className="ms-1 h-4 w-4" />
              </button>
              {isChatGPTOpen && (
                <div className="position-absolute top-100 start-0 mt-2 w-64 chat-main-bg border chat-border-gray-700 rounded-3 shadow-lg z-1000">
                  <div className="py-1">
                    <a href="#" className="d-flex align-items-center justify-content-between px-3 py-2 text-white text-sm hover-bg-gray">
                      <div>
                        <div className="font-semibold">ChatGPT Go</div>
                        <div className="text-xs dark-text-gray-400">Our smartest model & more</div>
                      </div>
                      <Button variant="default" size="sm" className="btn-purple rounded-pill text-white text-xs px-3 py-0_5">Upgrade</Button>
                    </a>
                    <div className="border-top chat-border-gray-700 my-1"></div>
                    <a href="#" className="d-flex align-items-center justify-content-between px-3 py-2 text-white text-sm hover-bg-gray">
                      <div>
                        <div className="font-semibold">ChatGPT</div>
                        <div className="text-xs dark-text-gray-400">Great for everyday tasks</div>
                      </div>
                      <Check className="h-4 w-4 text-success" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="hover-bg-gray">
            <MessageSquareDiff className="h-5 w-5 dark-text-gray-200" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow-1 overflow-auto p-2 scrollbar-hide">
          <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
            <li>
              <a href="#" className="d-flex align-items-center gap-3 p-2 rounded-3 dark-text-gray-200 hover-bg-gray transition-colors">
                <MessageSquareDiff className="h-5 w-5" />
                <span>New chat</span>
              </a>
            </li>
            <li>
              <a href="#" className="d-flex align-items-center gap-3 p-2 rounded-3 dark-text-gray-200 hover-bg-gray transition-colors">
                <Search className="h-5 w-5" />
                <span>Search chats</span>
              </a>
            </li>
            <li>
              <a href="#" className="d-flex align-items-center gap-3 p-2 rounded-3 dark-text-gray-200 hover-bg-gray transition-colors">
                <Book className="h-5 w-5" />
                <span>Library</span>
              </a>
            </li>
            <li>
              <a href="#" className="d-flex align-items-center gap-3 p-2 rounded-3 dark-text-gray-200 hover-bg-gray transition-colors">
                <Bot className="h-5 w-5" />
                <span>Sora</span>
              </a>
            </li>
             <li>
              <a href="#" className="d-flex align-items-center gap-3 p-2 rounded-3 dark-text-gray-200 hover-bg-gray transition-colors">
                <SquareGanttChart className="h-5 w-5" />
                <span>GPTs</span>
              </a>
            </li>
            <li>
              <a href="#" className="d-flex align-items-center gap-3 p-2 rounded-3 dark-text-gray-200 hover-bg-gray transition-colors">
                <LayoutDashboard className="h-5 w-5" />
                <span>Projects</span>
                <span className="ms-auto bg-blue-600 text-white text-xs px-2 py-0_5 rounded-pill">NEW</span>
              </a>
            </li>
          </ul>

          <div className="mt-4 text-xs dark-text-gray-400 text-uppercase font-weight-bold px-2">Chats</div>
          <ul className="list-unstyled mt-2 mb-0 d-flex flex-column gap-1">
            <li>
              <a href="#" className="d-block p-2 rounded-3 chat-main-bg dark-text-gray-200 hover-bg-gray transition-colors text-sm">New chat</a>
            </li>
          </ul>
        </nav>

        {/* User Account Section - Bottom Left */}
        <div className="p-3 border-top chat-border-gray-700">
          <div className="position-relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="btn btn-link text-white d-flex align-items-center w-100 gap-3 p-2 rounded-3 hover-bg-gray transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-circle d-flex align-items-center justify-content-center text-white font-weight-bold text-sm">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-grow-1 text-start">
                <div className="font-weight-medium text-white">{userName}</div>
                <div className="text-xs dark-text-gray-400">Free</div>
              </div>
              <ChevronDown className="h-4 w-4 dark-text-gray-400" />
            </button>
            {isUserMenuOpen && (
              <div className="position-absolute bottom-100 start-0 mb-2 w-100 chat-main-bg border chat-border-gray-700 rounded-3 shadow-lg z-1000">
                <div className="py-1">
                  <a href="#" className="d-block px-3 py-2 text-sm dark-text-gray-200 hover-bg-gray">My plan</a>
                  <a href="#" className="d-block px-3 py-2 text-sm dark-text-gray-200 hover-bg-gray">Settings</a>
                  <div className="border-top chat-border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-link d-block w-100 text-start px-3 py-2 text-sm dark-text-gray-200 hover-bg-gray"
                  >
                    <div className="d-flex align-items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex flex-column chat-main-bg dark-text-gray-200">
        {/* Main Header */}
        <div className="p-3 d-flex align-items-center justify-content-end border-bottom chat-border-gray-700">
          <div className="d-flex align-items-center gap-3">
            <Button variant="default" className="btn-purple rounded-pill px-3 py-2 d-flex align-items-center gap-2 text-sm">
              <span>Upgrade to Go</span>
            </Button>
            <Button variant="ghost" size="icon" className="dark-text-gray-400 hover-bg-gray">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="dark-text-gray-400 hover-bg-gray">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>


        {/* Chat Area */}
        <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column align-items-center scrollbar-hide">
          <div className="w-100 d-flex flex-column gap-4" style={{ maxWidth: '800px' }}>
            {messages.map((message) => (
              <div key={message.id} className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                {message.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-circle bg-gray-200 d-flex align-items-center justify-content-center text-gray-700 me-3 flex-shrink-0">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'chat-bubble-user'
                      : 'chat-bubble-assistant'
                  }`}
                  style={{ maxWidth: '75%' }}
                >
                  {message.text}
                  {message.sender === 'assistant' && (
                    <div className="d-flex gap-2 mt-2 dark-text-gray-500">
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-1 hover-bg-gray">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-1 hover-bg-gray">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-1 hover-bg-gray">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-1 hover-bg-gray">
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-circle bg-blue-500 d-flex align-items-center justify-content-center text-white ms-3 flex-shrink-0">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input Bar and Disclaimer */}
        <div className="pb-3 pt-2 d-flex flex-column align-items-center chat-main-bg border-top chat-border-gray-700">
          <div className="w-100 chat-input-wrapper d-flex align-items-center px-3 py-2 shadow-sm" style={{ maxWidth: '800px' }}>
            <Button variant="ghost" size="icon" className="dark-text-gray-400 hover-bg-gray">
              <Plus className="h-5 w-5" />
            </Button>
            <input
              type="text"
              placeholder="Ask anything"
              className="flex-grow-1 chat-input ms-3 text-lg"
              style={{ outline: 'none' }}
            />
            <Button variant="ghost" size="icon" className="dark-text-gray-400 hover-bg-gray">
              <Sparkles className="h-5 w-5 text-blue-500" />
            </Button>
            <Button variant="ghost" size="icon" className="dark-text-gray-400 hover-bg-gray ms-1">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-2 text-xs dark-text-gray-500">
            ChatGPT can make mistakes. Check important info.{" "}
            <a href="#" className="text-decoration-underline text-blue-500 hover-text-blue-600">Cookie Preferences</a>
          </p>
        </div>
      </main>
    </div>
  );
}