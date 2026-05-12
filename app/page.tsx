"use client";

import { useState, useEffect } from "react";
import { TAO, BUDDHIST, AFFIRMATIONS, SONGS, seededRandom } from "./_lib/content";
import { quotes } from "./_lib/quotes";
import tnhQuotes from "./_lib/tnh-quotes.json";
import { PAGE_BG, FONT_BODY } from "./_lib/theme";

import LoginModal from "../components/LoginModal";
import HeroDate from "../components/HeroDate";
import SongCard from "../components/SongCard";
import MorningBriefSection from "../components/MorningBriefSection";
import TodoSection from "../components/TodoSection";
import ApodSection, { type Apod } from "../components/ApodSection";
import ThichNhatHanhSection from "../components/ThichNhatHanhSection";
import BreatheSection from "../components/BreatheSection";
import ArtOfDaySection, { type Artwork } from "../components/ArtOfDaySection";
import TaoSection from "../components/TaoSection";
import BuddhistSection from "../components/BuddhistSection";
import AffirmationSection from "../components/AffirmationSection";
import QuoteSection from "../components/QuoteSection";
import GoodNewsSection, { type GoodNewsStory } from "../components/GoodNewsSection";
import YogaJournalSection from "../components/YogaJournalSection";
import Divider from "../components/Divider";

export default function MorningPage() {
  const now = new Date();
  const dateStr = now.toDateString();
  const rng = seededRandom(dateStr);

  const tao = TAO[Math.floor(rng() * TAO.length)];
  const buddhist = BUDDHIST[Math.floor(rng() * BUDDHIST.length)];
  const affirmation = AFFIRMATIONS[Math.floor(rng() * AFFIRMATIONS.length)];
  const song = SONGS[Math.floor(rng() * SONGS.length)];
  const quote = quotes[Math.floor(rng() * quotes.length)];
  const tnhQuote = tnhQuotes[Math.floor(rng() * tnhQuotes.length)];

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [weather, setWeather] = useState<{ summary: string; emoji: string; sunrise: string; sunset: string } | null>(null);
  const [aqi, setAqi] = useState<{ aqi: number; category: string; emoji: string } | null>(null);
  const [taoReflection, setTaoReflection] = useState<string | null>(null);
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [apod, setApod] = useState<Apod | null>(null);
  const [goodNews, setGoodNews] = useState<GoodNewsStory[]>([]);
  const [yogaStories, setYogaStories] = useState<GoodNewsStory[]>([]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    fetch("/api/auth").then((r) => r.json()).then((d) => setIsLoggedIn(!!d.ok)).catch(() => setIsLoggedIn(false));
    fetch("/api/weather").then((r) => r.json()).then(setWeather).catch(() => {});
    fetch("/api/air-quality").then((r) => r.json()).then((d) => !d.error && setAqi(d)).catch(() => {});
    fetch(`/api/tao-reflection?verse=${tao.verse}`).then((r) => r.json()).then((d) => setTaoReflection(d.reflection ?? null)).catch(() => {});
    fetch("/api/artwork").then((r) => r.json()).then((d) => !d.error && setArtwork(d)).catch(() => {});
    fetch("/api/apod").then((r) => r.json()).then((d) => !d.error && setApod(d)).catch(() => {});
    fetch("/api/good-news").then((r) => r.json()).then((d) => d.stories && setGoodNews(d.stories)).catch(() => {});
    fetch("/api/yoga-journal").then((r) => r.json()).then((d) => d.stories && setYogaStories(d.stories)).catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    if (res.ok) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginEmail("");
      setLoginPassword("");
    } else {
      setLoginError("Wrong password.");
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsLoggedIn(false);
  };

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = now.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: PAGE_BG,
        fontFamily: FONT_BODY,
        maxWidth: 430,
        margin: "0 auto",
        paddingBottom: 80,
      }}
    >
      {showLogin && (
        <LoginModal
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          loginError={loginError}
          loginLoading={loginLoading}
          handleLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      <HeroDate
        visible={visible}
        isLoggedIn={isLoggedIn}
        dayName={dayName}
        monthDay={monthDay}
        timeStr={timeStr}
        weather={weather}
        aqi={aqi}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      <SongCard visible={visible} song={song} />

      {isLoggedIn && <MorningBriefSection visible={visible} />}
      {isLoggedIn && <TodoSection visible={visible} />}

      <Divider visible={visible} />

      <ApodSection visible={visible} apod={apod} />
      <ThichNhatHanhSection visible={visible} quote={tnhQuote} />
      <BreatheSection visible={visible} />
      <ArtOfDaySection visible={visible} artwork={artwork} />
      <TaoSection visible={visible} tao={tao} taoReflection={taoReflection} />
      <BuddhistSection visible={visible} text={buddhist} />
      <AffirmationSection visible={visible} text={affirmation} />
      <QuoteSection visible={visible} quote={quote} />
      <GoodNewsSection visible={visible} stories={goodNews} />
      <YogaJournalSection visible={visible} stories={yogaStories} />
    </div>
  );
}
