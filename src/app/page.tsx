"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, PanInfo, animate } from "motion/react";
import {
  SlidersHorizontal,
  ChevronDown,
  Heart,
  Home,
  MapPin,
  CalendarCheck,
  User,
  Navigation,
  Clock,
  Utensils,
  ArrowUpDown,
  Zap,
  Trophy,
  Search,
  Star,
  CirclePlay,
  Bookmark,
  X,
  Check,
  Share2,
  Link,
  MessageCircle,
  Copy,
  ChevronRight,
} from "lucide-react";
import { RestaurantDetail, type FriendVisit, type RestaurantBase } from "./RestaurantDetail";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  distance: string;
  image: string;
  deals: string[];
  signal?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Dude's Coffee & Cake",
    cuisine: "Breakfast, Coffee",
    rating: 4.8,
    reviewCount: 143,
    distance: "0.4 km",
    image: "/images/coffee.jpg",
    deals: ["2for1 Beverage", "2for1 Espresso"],
    signal: "🔥 24 booked this week",
  },
  {
    id: "2",
    name: "Capo's Coffee Hafencity",
    cuisine: "Breakfast, Coffee",
    rating: 4.8,
    reviewCount: 143,
    distance: "1.1 km",
    image: "/images/cafe 1.jpg",
    deals: ["2for1 Coffee & Cake", "2for1 Matcha"],
    signal: "⏱️ Last booked 2 days ago",
  },
  {
    id: "3",
    name: "Camping Coffee im Kaufmannshaus",
    cuisine: "Café, Drinks",
    rating: 4.6,
    reviewCount: 89,
    distance: "0.8 km",
    image: "/images/cafe3.jpg",
    deals: ["2for1 Coffee", "Free Drink"],
    signal: "🔥 31 booked this week",
  },
  {
    id: "4",
    name: "Saffron House",
    cuisine: "Nahöstlich",
    rating: 4.9,
    reviewCount: 312,
    distance: "1.3 km",
    image: "/images/restaurant 1.jpg",
    deals: ["20% Rabatt"],
    signal: "⏱️ Last booked 3 hours ago",
  },
  {
    id: "5",
    name: "Sakura Ramen",
    cuisine: "Japanisch",
    rating: 4.7,
    reviewCount: 521,
    distance: "2.1 km",
    image: "/images/asian food.jpg",
    deals: ["Free Gyoza", "2for1 Ramen"],
    signal: "🔥 18 booked this week",
  },
  {
    id: "6",
    name: "Markthalle Süd",
    cuisine: "Markt, Snacks",
    rating: 4.3,
    reviewCount: 213,
    distance: "2.8 km",
    image: "/images/place.jpg",
    deals: ["10€ Gutschein"],
    signal: "⏱️ Last booked 5 days ago",
  },
];

// Map pin positions as % of map container
const MAP_PINS = [
  { x: 30, y: 32 }, { x: 22, y: 40 }, { x: 38, y: 28 },
  { x: 55, y: 22 }, { x: 58, y: 42 }, { x: 72, y: 44 },
  { x: 65, y: 35 }, { x: 48, y: 54 }, { x: 56, y: 60 },
  { x: 40, y: 62 }, { x: 28, y: 52 }, { x: 34, y: 46 },
  { x: 18, y: 46 }, { x: 18, y: 56 }, { x: 25, y: 63 },
  { x: 32, y: 67 }, { x: 12, y: 38 }, { x: 15, y: 53 },
  { x: 80, y: 28 }, { x: 82, y: 42 }, { x: 82, y: 50 },
  { x: 60, y: 72 }, { x: 68, y: 64 }, { x: 72, y: 74 },
  { x: 76, y: 55 }, { x: 70, y: 48 }, { x: 62, y: 24 },
  { x: 45, y: 18 }, { x: 75, y: 18 }, { x: 48, y: 74 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[54px] flex items-end justify-between px-5 pb-2 z-30 pointer-events-none">
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: 15,
          lineHeight: "20px",
          letterSpacing: "-0.3px",
          color: "#0a0a0a",
        }}
      >
        9:41
      </span>
      <div className="flex items-center gap-[5px]">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.8" fill="#0a0a0a" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" fill="#0a0a0a" />
          <rect x="9" y="2" width="3" height="10" rx="0.8" fill="#0a0a0a" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="#0a0a0a" opacity="0.3" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#0a0a0a" />
          <path d="M3.5 6.5C4.9 5.1 6.4 4.4 8 4.4s3.1.7 4.5 2.1" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 3.5C3 1.5 5.4 0.5 8 0.5s5 1 7 3" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#0a0a0a" strokeOpacity="0.35" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="#0a0a0a" />
          <path d="M22.5 4v4a2 2 0 000-4z" fill="#0a0a0a" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function MapBackground() {
  // CartoDB Positron tiles — free, no API key, looks like Google Maps
  // Berlin Mitte center: zoom 15, tile x=17601, y=10749
  const Z = 15;
  const tiles: { x: number; y: number }[] = [];
  for (let dy = -1; dy <= 2; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tiles.push({ x: 17601 + dx, y: 10749 + dy });
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f2efe9]">
      <div
        className="absolute"
        style={{
          left: -100,
          top: -110,
          width: 768,
          height: 1024,
          display: "grid",
          gridTemplateColumns: "repeat(3, 256px)",
          gridTemplateRows: "repeat(4, 256px)",
        }}
      >
        {tiles.map(({ x, y }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${x}-${y}`}
            src={`https://a.basemaps.cartocdn.com/light_all/${Z}/${x}/${y}.png`}
            alt=""
            width={256}
            height={256}
            style={{ display: "block" }}
          />
        ))}
      </div>
    </div>
  );
}

function NeoPin({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -100%)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 24,
          height: 32,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Pin head */}
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(-45deg)",
            background: "#53f293",
            border: "1.5px solid rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/N.png"
            alt=""
            style={{
              transform: "rotate(45deg)",
              width: 12,
              height: 12,
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Social map pins ──────────────────────────────────────────────────────────

function MapMarker({ x, y, children, badge, badgeLeft, extraCount, active, onClick, pinColor = "#53f293" }: {
  x: number; y: number; children: React.ReactNode; badge?: React.ReactNode; badgeLeft?: React.ReactNode; extraCount?: number;
  active?: boolean; onClick?: () => void; pinColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute pointer-events-auto active:scale-95 transition-transform"
      style={{
        left: `${x}%`, top: `${y}%`,
        transform: `translate(-50%, -100%) scale(${active ? 1.18 : 1})`,
        zIndex: active ? 20 : 10,
        transitionProperty: "transform",
        transitionDuration: "180ms",
        transitionTimingFunction: "var(--ease-ios)",
      }}
    >
      {/* Wrapper is 40x48 — teardrop sits in the top 40x40, its tip
          extends ~8px down into the lower 8px so the visual tip is at the
          wrapper's bottom (which sits at the map coordinate). */}
      <div style={{ position: "relative", width: 40, height: 48 }}>
        {/* Teardrop head — same shape as the discover NeoPin, scaled up */}
        <div
          style={{
            position: "absolute", top: 0, left: 0,
            width: 40, height: 40,
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(-45deg)",
            background: pinColor,
            border: active ? "2.5px solid #11301d" : "1.5px solid rgba(0,0,0,0.15)",
            boxShadow: active ? "0 4px 14px rgba(0,0,0,0.30)" : "0 2px 6px rgba(0,0,0,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Inner avatar — counter-rotated so contents read upright */}
          <div
            style={{
              transform: "rotate(45deg)",
              width: 30, height: 30,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: pinColor,
            }}
          >
            {children}
          </div>
        </div>
        {badge && <div style={{ position: "absolute", top: -2, right: -4, zIndex: 2 }}>{badge}</div>}
        {badgeLeft && <div style={{ position: "absolute", top: -2, left: -4, zIndex: 2 }}>{badgeLeft}</div>}
        {(extraCount ?? 0) > 0 && (
          <div style={{
            position: "absolute", bottom: 6, right: -18, zIndex: 2,
            background: "#11301d", borderRadius: 99, border: "1.5px solid white",
            padding: "2px 5px",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#53f293", lineHeight: 1, fontFamily: "Poppins, sans-serif" }}>+{extraCount}</span>
          </div>
        )}
      </div>
    </button>
  );
}

function FriendMapPin({ x, y, person, hasReturnVisit, hasFavourited, extraFriends, active, onClick }: {
  x: number; y: number;
  person: { photo?: string; initial: string };
  hasReturnVisit: boolean;
  hasFavourited?: boolean;
  extraFriends?: number;
  active: boolean;
  onClick: () => void;
}) {
  const badge = hasReturnVisit ? (
    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff592", border: "1.5px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/Return_visits.png" alt="" style={{ width: 8, height: 8, objectFit: "contain" }} />
    </div>
  ) : undefined;
  const heartBadge = hasFavourited ? (
    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fce4e4", border: "1.5px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="8" height="8" viewBox="0 0 10 10" fill="#f24141" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 8.5C5 8.5 1 5.8 1 3.2C1 1.8 2 1 3.2 1C4 1 4.7 1.5 5 2C5.3 1.5 6 1 6.8 1C8 1 9 1.8 9 3.2C9 5.8 5 8.5 5 8.5Z"/>
      </svg>
    </div>
  ) : undefined;
  return (
    <MapMarker x={x} y={y} badge={badge} badgeLeft={heartBadge} extraCount={extraFriends} active={active} onClick={onClick}>
      {person.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={person.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span style={{ fontSize: 13, fontWeight: 700, color: "#11301d", fontFamily: "Poppins, sans-serif" }}>{person.initial}</span>
      )}
    </MapMarker>
  );
}

function LegendMapPin({ x, y, count, hasReturnVisit, active, onClick }: {
  x: number; y: number; count: number; hasReturnVisit: boolean;
  active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute pointer-events-auto active:scale-95 transition-transform"
      style={{
        left: `${x}%`, top: `${y}%`,
        transform: `translate(-50%, -100%) scale(${active ? 1.18 : 1})`,
        zIndex: active ? 20 : 10,
        transitionProperty: "transform",
        transitionDuration: "180ms",
        transitionTimingFunction: "var(--ease-ios)",
      }}
    >
      <div style={{ position: "relative", width: 40, height: 48 }}>
        {/* Count badge at top-left */}
        <div style={{
          position: "absolute", top: -4, left: -6, zIndex: 3,
          minWidth: 18, height: 18, borderRadius: 9,
          background: "#11301d", border: "1.5px solid white",
          display: "flex", alignItems: "center", justifyContent: "center",
          paddingLeft: 4, paddingRight: 4,
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "white", fontFamily: "Poppins, sans-serif" }}>{count}</span>
        </div>

        {/* Teardrop pin */}
        <div
          style={{
            position: "absolute", top: 0, left: 0,
            width: 40, height: 40,
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(-45deg)",
            background: "#11301d",
            border: active ? "2.5px solid #53f293" : "1.5px solid rgba(0,0,0,0.25)",
            boxShadow: active ? "0 4px 14px rgba(0,0,0,0.30)" : "0 2px 6px rgba(0,0,0,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div style={{
            transform: "rotate(45deg)",
            width: 30, height: 30,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/N.png" alt="" style={{ width: 16, height: 16, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>
        </div>

        {/* Return-visit indicator at bottom-right */}
        {hasReturnVisit && (
          <div style={{
            position: "absolute", bottom: 6, right: -4, zIndex: 2,
            width: 14, height: 14, borderRadius: "50%",
            background: "#fff592", border: "1.5px solid white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Return_visits.png" alt="" style={{ width: 8, height: 8, objectFit: "contain" }} />
          </div>
        )}
      </div>
    </button>
  );
}

const USER_AVATAR = "/images/Steve.jpg";

function MyListMapPin({ x, y, type, active, onClick }: {
  x: number; y: number;
  type: "visited" | "saved";
  active: boolean;
  onClick: () => void;
}) {
  return (
    <MapMarker x={x} y={y} active={active} onClick={onClick}>
      {type === "visited" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={USER_AVATAR} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <Heart size={16} fill="#11301d" className="text-[#11301d]" />
      )}
    </MapMarker>
  );
}

// ─── Social result strip ──────────────────────────────────────────────────────

function SocialResultCard({
  active, onClick, image, title, topLine, cuisine, rating, distance, deals, saved, returnBadge,
}: {
  active: boolean;
  onClick: () => void;
  image: string; title: string; topLine: string; cuisine: string;
  rating: number; distance: string; deals: string[];
  saved?: boolean;
  returnBadge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 snap-start w-[360px] bg-white rounded-[18px] text-left flex p-[10px] gap-[12px]"
      style={{
        boxShadow: active ? "0 6px 18px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.10)",
        transition: "box-shadow 180ms var(--ease-ios)",
      }}
    >
      <div className="relative w-[92px] h-[92px] rounded-[12px] overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div
          className="absolute top-[6px] right-[6px] w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}
        >
          <Heart
            size={12}
            className={saved ? "text-[#f24141]" : "text-[#0a0a0a]"}
            fill={saved ? "#f24141" : "none"}
          />
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
        {/* topLine + pill in a flex row with 8px gap */}
        <div className="flex items-center gap-[8px] min-w-0 mb-[8px]">
          <span className="text-[12px] font-medium text-[#737373] leading-[16px] truncate flex-1 min-w-0" style={{ fontFamily: "Poppins, sans-serif" }}>{topLine}</span>
          {returnBadge && (
            <div
              className="shrink-0 rounded-[8px]"
              style={{
                background: "#fff592",
                padding: "5px 10px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="font-semibold whitespace-nowrap"
                style={{ fontFamily: "Poppins, sans-serif", color: "#11301d", fontSize: 10, lineHeight: 1 }}
              >
                {returnBadge}
              </span>
            </div>
          )}
        </div>
        <span className="text-[16px] font-bold text-[#0a0a0a] leading-[20px] truncate" style={{ fontFamily: "Poppins, sans-serif" }}>{title}</span>
        <div className="flex items-center gap-[6px] min-w-0">
          <span className="text-[11px] font-medium text-[#737373] leading-[14px] truncate min-w-0" style={{ fontFamily: "Poppins, sans-serif" }}>{cuisine}</span>
          <span className="w-[2px] h-[2px] rounded-full bg-[#737373] shrink-0" />
          <div className="flex items-center gap-[3px] shrink-0">
            <Star size={10} fill="#fcd413" className="text-[#fcd413]" />
            <span className="text-[11px] font-medium text-[#737373] whitespace-nowrap leading-[14px]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {rating.toFixed(1).replace(".", ",")} · {distance}
            </span>
          </div>
        </div>
        <div className="flex gap-[4px] mt-[3px] overflow-x-auto scrollbar-hide">
          {deals.map((d) => (
            <span key={d} className="shrink-0 px-[8px] py-[2px] rounded-full text-[11px] font-semibold text-[#0a0a0a] whitespace-nowrap leading-[16px]" style={{ background: "#53f293", fontFamily: "Poppins, sans-serif" }}>{d}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

function SocialResultStrip({ mode, activeIdx, setActiveIdx, onClose, onOpenDetail }: {
  mode: SocialTab;
  activeIdx: number;
  setActiveIdx: (i: number) => void;
  onClose: () => void;
  onOpenDetail: (idx: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const programmaticScroll = useRef(false);
  // When the active card changes because of a user swipe (not a pin tap),
  // we set this so the next render skips the scroll-into-view animation —
  // otherwise the animate() call fights the user's scroll and feels glitchy.
  const userScrollIdxChange = useRef(false);
  const scrollSettleTimer = useRef<number | null>(null);

  function lastBookedLabel(days: number): string {
    if (days === 1) return "yesterday";
    if (days < 5)  return `${days} days ago`;
    if (days < 11) return "1 week ago";
    if (days < 18) return "2 weeks ago";
    return `${Math.round(days / 7)} weeks ago`;
  }

  const cards = mode === "friends"
    ? FRIEND_RESULT_CARDS.map((c) => ({
        image: c.restaurant.image, title: c.restaurant.name, cuisine: c.restaurant.cuisine,
        topLine: c.topLine ?? `${c.friendName} booked ${lastBookedLabel(c.lastVisitDays)}`,
        rating: c.restaurant.rating,
        distance: c.restaurant.distance, deals: c.restaurant.deals,
        returnBadge: c.badge,
      }))
    : mode === "legends"
    ? LEGEND_RESULT_CARDS.map((c) => ({
        image: c.restaurant.image, title: c.restaurant.name, cuisine: c.restaurant.cuisine,
        topLine: c.rebooked > 0
          ? `${c.booked} booked · ${c.rebooked} rebooked`
          : `${c.booked} booked`,
        rating: c.restaurant.rating,
        distance: c.restaurant.distance, deals: c.restaurant.deals,
      }))
    : MYLIST_ENTRIES.map((entry) => ({
        image: entry.restaurant.image, title: entry.restaurant.name, cuisine: entry.restaurant.cuisine,
        topLine: entry.meta,
        rating: entry.restaurant.rating,
        distance: entry.restaurant.distance, deals: entry.restaurant.deals,
        saved: entry.type === "saved",
      }));

  // Scroll active card into view when activeIdx changes (e.g. pin tapped).
  // Uses motion's `animate` with an iOS-style easing curve for a smoother
  // feel than the browser's default scrollTo smooth behaviour.
  useEffect(() => {
    // If the active card changed because the user swiped to it, the scroll
    // is already in the right place — running animate() here would fight
    // their gesture and produce a visible jitter.
    if (userScrollIdxChange.current) {
      userScrollIdxChange.current = false;
      return;
    }
    const card = cardRefs.current[activeIdx];
    const scroller = scrollerRef.current;
    if (!card || !scroller) return;
    // Left-align card to match the filter chips' 16px gutter
    const target = card.offsetLeft - 16;
    if (Math.abs(scroller.scrollLeft - target) < 4) return;

    programmaticScroll.current = true;
    const controls = animate(scroller.scrollLeft, target, {
      duration: 0.55,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (v) => { scroller.scrollLeft = v; },
      onComplete: () => { programmaticScroll.current = false; },
    });

    return () => {
      controls.stop();
      programmaticScroll.current = false;
    };
  }, [activeIdx]);

  // Debounced scroll detection — only commit a new activeIdx once the
  // scroll has settled. Updating on every scroll event mid-swipe makes
  // the strip stutter as state churns under the gesture.
  function handleScroll() {
    if (programmaticScroll.current) return;
    if (scrollSettleTimer.current !== null) {
      window.clearTimeout(scrollSettleTimer.current);
    }
    scrollSettleTimer.current = window.setTimeout(() => {
      scrollSettleTimer.current = null;
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let nearest = 0;
      let nearestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < nearestDist) { nearestDist = dist; nearest = i; }
      });
      if (nearest !== activeIdx) {
        userScrollIdxChange.current = true;
        setActiveIdx(nearest);
      }
    }, 140);
  }

  // Clean up the settle timer if the strip unmounts mid-debounce.
  useEffect(() => {
    return () => {
      if (scrollSettleTimer.current !== null) {
        window.clearTimeout(scrollSettleTimer.current);
        scrollSettleTimer.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      className="absolute left-0 right-0 z-30"
      style={{ bottom: TAB_BAR_HEIGHT + 8 }}
      initial={{ y: 240, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 240, opacity: 0 }}
      transition={{ type: "spring", damping: 32, stiffness: 320 }}
    >
      {/* Floating close button */}
      <div className="px-[16px] mb-[12px] flex items-center justify-end">
        <button
          onClick={onClose}
          className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          <X size={16} className="text-[#0a0a0a]" />
        </button>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex gap-[12px] overflow-x-auto scrollbar-hide pb-[12px] snap-x snap-mandatory"
        style={{ paddingLeft: 16, paddingRight: 16, scrollPaddingLeft: 16 }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="shrink-0"
          >
            <SocialResultCard
              {...c}
              active={i === activeIdx}
              onClick={() => {
                if (i === activeIdx) onOpenDetail(i);
                else setActiveIdx(i);
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FriendsChipIcon({ mode, hasFriends }: { mode: SocialTab | null; hasFriends: boolean }) {
  if (mode === "legends") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/Food legend.png" alt="" className="w-[14px] h-[14px] object-contain shrink-0" />
    );
  }
  if (mode === "mylist") {
    return <Heart size={12} fill="#11301d" className="text-[#11301d] shrink-0" />;
  }
  if (!hasFriends) return <Trophy size={12} className="text-[#0a0a0a] shrink-0" />;
  return (
    <div className="relative w-[26px] h-[18px] shrink-0">
      {/* Back avatar */}
      <div className="absolute right-0 top-0 w-[18px] h-[18px] rounded-full border-[1.5px] border-white overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Steve.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Front avatar */}
      <div className="absolute left-0 top-0 w-[18px] h-[18px] rounded-full border-[1.5px] border-white overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Laura.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

function FilterChips({
  hasFriends,
  activeFilter,
  socialResultMode,
  onFilterTap,
}: {
  hasFriends: boolean;
  activeFilter: string | null;
  socialResultMode: SocialTab | null;
  onFilterTap: (id: string) => void;
}) {
  const chipBase =
    "flex items-center gap-[6px] px-[12px] py-[8px] rounded-full bg-[#fefefe] shrink-0 cursor-pointer select-none active:scale-[0.96] transition-transform duration-100";
  const chipShadow = { border: "1.5px solid rgba(0,0,0,0.12)" };
  const chipActiveStyle = { background: "#08180f" };
  const textBase = "font-semibold text-[14px] leading-[18px] whitespace-nowrap";

  const chips = [
    (() => {
      // Chip mirrors the active social result mode — once the user picks a
      // tab and applies it, the chip relabels to match (Friends / Local
      // Foodies / My list). When no mode is active it falls back to the
      // user's default (Friends if they have any, else Local Foodies).
      const effectiveMode: SocialTab | null = socialResultMode ?? (hasFriends ? null : "legends");
      const label =
        effectiveMode === "legends" ? "Local Foodies" :
        effectiveMode === "mylist"  ? "My list" :
                                       "Friends";
      const count =
        effectiveMode === "legends" ? LEGENDS_LIST.length :
        effectiveMode === "mylist"  ? MYLIST_ENTRIES.length :
                                       FRIENDS_LIST.length;
      return {
        id: "friends",
        label,
        icon: <FriendsChipIcon mode={effectiveMode} hasFriends={hasFriends} />,
        hasArrow: true,
        count,
      };
    })(),
    {
      id: "filters",
      label: "Filters",
      icon: <SlidersHorizontal size={12} />,
      hasArrow: true,
    },
    {
      id: "now",
      label: "Now",
      icon: <Clock size={12} />,
      hasArrow: false,
    },
    {
      id: "cuisine",
      label: "Cuisine",
      icon: <Utensils size={12} />,
      hasArrow: true,
    },
    {
      id: "sort",
      label: "Sort",
      icon: <ArrowUpDown size={12} />,
      hasArrow: true,
    },
    {
      id: "flash",
      label: "Flash Deals",
      icon: <Zap size={12} />,
      hasArrow: false,
    },
    {
      id: "loyalty",
      label: "Loyalty",
      icon: <Trophy size={12} />,
      hasArrow: false,
    },
  ];

  return (
    <div
      className="flex gap-[4px] overflow-x-scroll scrollbar-hide"
      style={{ touchAction: "pan-x", paddingLeft: 16, paddingRight: 16, marginLeft: -16, marginRight: -16 }}
    >
      {chips.map((chip) => {
        const isActive = activeFilter === chip.id;
        const isFriendOutline = isActive && chip.id === "friends";
        const chipStyle = isFriendOutline
          ? { ...chipShadow, border: "2px solid #11301d", borderRadius: 9999 }
          : isActive
          ? { ...chipShadow, ...chipActiveStyle }
          : chipShadow;
        const iconCls = isActive && !isFriendOutline ? "text-[#53f293]" : "text-[#0a0a0a]";
        const textClr = isActive && !isFriendOutline ? "#53f293" : "#0a0a0a";
        return (
          <button
            key={chip.id}
            className={chipBase}
            style={chipStyle}
            onClick={() => onFilterTap(chip.id)}
          >
            <span className={iconCls}>{chip.icon}</span>
            <span
              className={`${textBase}`}
              style={{ fontFamily: "Poppins, sans-serif", color: textClr }}
            >
              {chip.label}
            </span>
            {"count" in chip && chip.count !== undefined && isActive && (
              <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0" style={{ background: "#53f293" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#11301d", fontFamily: "Poppins, sans-serif" }}>{chip.count}</span>
              </div>
            )}
            {chip.hasArrow && (
              <ChevronDown
                size={12}
                className={isActive && !isFriendOutline ? "text-[#53f293]" : "text-[#0a0a0a]"}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function DealChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-[8px] py-[4px] rounded-full text-[12px] font-semibold whitespace-nowrap shrink-0"
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#53f293",
        color: "#0a0a0a",
        lineHeight: "16px",
      }}
    >
      {label}
    </span>
  );
}

function RestaurantListItem({
  restaurant,
  showDivider,
}: {
  restaurant: Restaurant;
  showDivider: boolean;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <div className="flex gap-[12px] items-center py-[8px]">
        {/* Image */}
        <div className="relative shrink-0 w-[108px] h-[108px] rounded-[16px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {/* Heart icon overlay */}
          <button
            className="absolute top-[8px] left-[8px] w-[24px] h-[24px] flex items-center justify-center"
            onClick={() => setSaved(!saved)}
          >
            <Heart
              size={18}
              className={saved ? "text-[#f24141]" : "text-white"}
              fill={saved ? "#f24141" : "none"}
              strokeWidth={2}
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[8px] flex-1 min-w-0">
          {/* Name + meta */}
          <div className="flex flex-col gap-[2px]">
            <p
              className="text-[14px] font-semibold leading-[18px] text-[#0a0a0a] truncate"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {restaurant.name}
            </p>
            <div className="flex items-center gap-[6px]">
              <span
                className="text-[12px] font-medium leading-[18px] text-[#737373]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {restaurant.cuisine}
              </span>
              <span className="w-[2px] h-[2px] rounded-full bg-[#737373] shrink-0" />
              <Star size={11} fill="#fcd413" className="text-[#fcd413] shrink-0" />
              <span
                className="text-[12px] font-medium text-[#737373] whitespace-nowrap"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {restaurant.rating.toFixed(1).replace(".", ",")}
              </span>
              <span className="text-[#737373] text-[12px] leading-[18px]">
                ({restaurant.reviewCount})
              </span>
            </div>
          </div>

          {/* Deal chips — horizontal scroll */}
          <div className="flex gap-[4px] overflow-x-auto scrollbar-hide">
            {restaurant.deals.map((deal) => (
              <DealChip key={deal} label={deal} />
            ))}
          </div>

          {/* Recency signal pill */}
          {restaurant.signal && (
            <div
              className="self-start px-[8px] py-[3px] rounded-full"
              style={{ background: "rgba(0,0,0,0.05)" }}
            >
              <span
                className="text-[11px] font-medium leading-[16px] whitespace-nowrap"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                {restaurant.signal}
              </span>
            </div>
          )}
        </div>
      </div>
      {showDivider && (
        <div className="h-px w-full bg-[rgba(0,0,0,0.05)]" />
      )}
    </>
  );
}

// ─── Social sheet ─────────────────────────────────────────────────────────────

type SocialTab = "friends" | "legends" | "mylist";

interface FriendPerson {
  initial: string;
  name: string;
  meta: string;
  badge?: string;
  photo?: string;
  isLegend?: boolean;
}

const FRIENDS_LIST: FriendPerson[] = [
  { initial: "S", name: "Steve",  meta: "Visited 5 places • Saved 8 places",  badge: "x2 returns", photo: "/images/Steve.jpg" },
  { initial: "L", name: "Laura",  meta: "Visited 3 places • Saved 2 places",  badge: "x1 returns", photo: "/images/Laura.jpg" },
  { initial: "K", name: "Kate",   meta: "Visited 2 places • Saved 0 places",  badge: "x1 returns", photo: "/images/Kate.jpg" },
  { initial: "M", name: "Mia",    meta: "Visited 0 places • Saved 0 places",  photo: "/images/Mia.jpg" },
  { initial: "J", name: "James",  meta: "Visited 7 places • Saved 12 places", badge: "x3 returns" },
  { initial: "S", name: "Sophie", meta: "Visited 4 places • Saved 6 places",  badge: "x1 returns" },
  { initial: "R", name: "Ryan",   meta: "Visited 1 place • Saved 3 places" },
  { initial: "E", name: "Emma",   meta: "Visited 0 places • Saved 0 places" },
];

const LEGENDS_LIST: FriendPerson[] = [
  { initial: "S", name: "Sam",      meta: "Visited 120 places • Saved 30 places", badge: "x10 returns", photo: "/images/Sam.jpg",   isLegend: true },
  { initial: "L", name: "Lucas",    meta: "Visited 92 places • Saved 7 places",   badge: "x8 returns",  photo: "/images/Lucas.jpg", isLegend: true },
  { initial: "K", name: "Kim",      meta: "Visited 87 places • Saved 10 places",  badge: "x6 returns",  photo: "/images/Kim.jpg",   isLegend: true },
  { initial: "A", name: "Amy",      meta: "Visited 74 places • Saved 15 places",  badge: "x5 returns",  photo: "/images/Amy.jpg",   isLegend: true },
  { initial: "M", name: "Marcus",   meta: "Visited 68 places • Saved 9 places",   badge: "x4 returns",  isLegend: true },
  { initial: "Z", name: "Zoe",      meta: "Visited 61 places • Saved 11 places",  badge: "x4 returns",  isLegend: true },
  { initial: "P", name: "Priya",    meta: "Visited 55 places • Saved 8 places",   badge: "x3 returns",  isLegend: true },
  { initial: "T", name: "Tom",      meta: "Visited 49 places • Saved 6 places",   badge: "x3 returns",  isLegend: true },
  { initial: "I", name: "Isabella", meta: "Visited 43 places • Saved 14 places",  badge: "x2 returns",  isLegend: true },
  { initial: "N", name: "Noah",     meta: "Visited 38 places • Saved 5 places",   badge: "x2 returns",  isLegend: true },
  { initial: "C", name: "Chloe",    meta: "Visited 33 places • Saved 7 places",   badge: "x2 returns",  isLegend: true },
  { initial: "L", name: "Liam",     meta: "Visited 28 places • Saved 4 places",   badge: "x1 returns",  isLegend: true },
  { initial: "S", name: "Sofia",    meta: "Visited 22 places • Saved 3 places",   badge: "x1 returns",  isLegend: true },
  { initial: "M", name: "Max",      meta: "Visited 17 places • Saved 2 places",   badge: "x1 returns",  isLegend: true },
  { initial: "H", name: "Hannah",   meta: "Visited 13 places • Saved 5 places",   badge: "x1 returns",  isLegend: true },
  { initial: "J", name: "Jake",     meta: "Visited 9 places • Saved 1 place",     badge: "x1 returns",  isLegend: true },
  { initial: "A", name: "Aria",     meta: "Visited 5 places • Saved 0 places",    isLegend: true },
  { initial: "O", name: "Oliver",   meta: "Visited 2 places • Saved 0 places",    isLegend: true },
];

interface MyListEntry {
  restaurant: Restaurant;
  type: "visited" | "saved";
  meta: string;
}

const MYLIST_ENTRIES: MyListEntry[] = [
  { restaurant: RESTAURANTS[0], type: "visited", meta: "Visited 3 times"   },
  { restaurant: RESTAURANTS[1], type: "visited", meta: "Visited last week" },
  { restaurant: RESTAURANTS[2], type: "saved",   meta: "Saved 5 days ago"  },
  { restaurant: RESTAURANTS[3], type: "saved",   meta: "Saved 2 weeks ago" },
  { restaurant: RESTAURANTS[4], type: "visited", meta: "Visited yesterday" },
  { restaurant: RESTAURANTS[5], type: "saved",   meta: "Saved today"       },
];

// ─── Social result map data ───────────────────────────────────────────────────

// Pins are paired 1:1 with FRIEND_RESULT_CARDS by array index. The
// return-visit badge is derived from the card's `visits` count, so the
// pin icon and card text can never disagree.
const FRIEND_MAP_PINS = [
  { x: 30, y: 32, personIdx: 0 },
  { x: 55, y: 22, personIdx: 1 },
  { x: 22, y: 40, personIdx: 2 },
  { x: 65, y: 35, personIdx: 3 },
  { x: 48, y: 54, personIdx: 4 },
  { x: 38, y: 62, personIdx: 5 },
  { x: 72, y: 44, personIdx: 6 },
  { x: 56, y: 60, personIdx: 7 },
];

// Paired with LEGEND_RESULT_CARDS by index. Return-visit icon is derived
// from the card's `rebooked` count.
const LEGEND_MAP_PINS = [
  { x: 30, y: 25, count: 28 },
  { x: 45, y: 30, count: 7 },
  { x: 22, y: 38, count: 55 },
  { x: 12, y: 42, count: 34 },
  { x: 72, y: 35, count: 25 },
  { x: 38, y: 50, count: 100 },
  { x: 55, y: 45, count: 3 },
  { x: 18, y: 55, count: 82 },
  { x: 28, y: 60, count: 78 },
  { x: 65, y: 60, count: 52 },
];

// Paired 1:1 with MYLIST_ENTRIES by index — pin icon (heart vs check)
// is driven by the entry's `type`.
const MYLIST_MAP_PINS = [
  { x: 30, y: 32 }, { x: 55, y: 22 }, { x: 22, y: 40 },
  { x: 65, y: 35 }, { x: 48, y: 54 }, { x: 38, y: 62 },
];

interface FriendResultCard {
  friendName: string;
  initial: string;
  photo?: string;
  visits: number;
  restaurant: Restaurant;
  lastVisitDays: number;
  quote: string;
  badge?: string;
  favourited?: boolean;
  topLine?: string;
  extraFriends?: number;
  groupText?: string;
  isLegend?: boolean;
}

const FRIEND_RESULT_CARDS: FriendResultCard[] = [
  { friendName: "Steve",  initial: "S", photo: "/images/Steve.jpg", visits: 2, restaurant: RESTAURANTS[0], lastVisitDays: 6,  quote: "Honestly the best coffee in Mitte. The lunch deal makes it a no-brainer.", badge: "x2 returns", favourited: true, isLegend: true },
  { friendName: "Laura",  initial: "L", photo: "/images/Laura.jpg", visits: 1, restaurant: RESTAURANTS[1], lastVisitDays: 3,  quote: "Cosy spot. Great matcha and the cake was huge.",                          badge: "x1 returns", favourited: true  },
  { friendName: "Kate",   initial: "K", photo: "/images/Kate.jpg",  visits: 3, restaurant: RESTAURANTS[2], lastVisitDays: 9,  quote: "I keep coming back for the flat white. Friendly staff too.",              badge: "x1 returns"                   },
  { friendName: "Mia",    initial: "M", photo: "/images/Mia.jpg",   visits: 1, restaurant: RESTAURANTS[3], lastVisitDays: 12, quote: "Great for dates — the hummus is unreal.",                                                  favourited: true, topLine: "Mia and 2 more friends have booked here", extraFriends: 2, groupText: "Mia, Steve and Laura have all booked here" },
  { friendName: "James",  initial: "J",                              visits: 2, restaurant: RESTAURANTS[4], lastVisitDays: 4,  quote: "Ramen is the real deal, gyoza was a nice bonus.",                        badge: "x3 returns"                   },
  { friendName: "Sophie", initial: "S",                              visits: 4, restaurant: RESTAURANTS[5], lastVisitDays: 1,  quote: "Best snack run in Kreuzberg. The 10€ voucher goes a long way.",          badge: "x1 returns", favourited: true  },
  { friendName: "Ryan",   initial: "R",                              visits: 1, restaurant: RESTAURANTS[0], lastVisitDays: 18, quote: "Solid morning coffee. Quiet spot to actually get work done."                                                   },
  { friendName: "Emma",   initial: "E",                              visits: 2, restaurant: RESTAURANTS[3], lastVisitDays: 5,  quote: "Generous portions, fast service, good vibe.",                           badge: "x1 returns", favourited: true  },
];

const LEGEND_RESULT_CARDS = [
  { booked: 28,  rebooked: 7,  restaurant: RESTAURANTS[0], lastVisitDays: 3,  quote: "This place is a weekly ritual for me — the coffee alone is worth the trip."       },
  { booked: 7,   rebooked: 2,  restaurant: RESTAURANTS[1], lastVisitDays: 8,  quote: "Best matcha I've found in the city. The cake is generous too."                     },
  { booked: 55,  rebooked: 12, restaurant: RESTAURANTS[2], lastVisitDays: 1,  quote: "Quiet, consistent, and the flat white is perfect every single time."               },
  { booked: 34,  rebooked: 8,  restaurant: RESTAURANTS[3], lastVisitDays: 14, quote: "Great for a long lunch. The hummus board never disappoints."                        },
  { booked: 25,  rebooked: 5,  restaurant: RESTAURANTS[4], lastVisitDays: 5,  quote: "The ramen here is legitimately the best in this part of town."                     },
  { booked: 100, rebooked: 32, restaurant: RESTAURANTS[5], lastVisitDays: 2,  quote: "Incredible value with the deal. I've brought everyone I know here."                },
  { booked: 3,   rebooked: 0,  restaurant: RESTAURANTS[0], lastVisitDays: 21, quote: "Solid spot for a morning coffee before work — never too busy early on."            },
  { booked: 82,  rebooked: 21, restaurant: RESTAURANTS[1], lastVisitDays: 4,  quote: "The staff always remember my order. That's rare and I love it."                    },
  { booked: 78,  rebooked: 19, restaurant: RESTAURANTS[2], lastVisitDays: 7,  quote: "Discovered this through the app and it's become my go-to neighbourhood spot."     },
  { booked: 52,  rebooked: 11, restaurant: RESTAURANTS[3], lastVisitDays: 10, quote: "Portions are huge and the deal makes it an absolute no-brainer."                   },
];

function PersonAvatar({ photo, initial }: { photo?: string; initial: string }) {
  return (
    <div className="w-[30px] h-[30px] rounded-full overflow-hidden shrink-0 flex items-center justify-center"
      style={{ background: photo ? undefined : "#53f293" }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={initial} className="w-full h-full object-cover" />
      ) : (
        <span className="text-[13px] font-semibold text-[#11301d]" style={{ fontFamily: "Poppins, sans-serif" }}>{initial}</span>
      )}
    </div>
  );
}

function PersonRow({ person, showDivider }: { person: FriendPerson; showDivider: boolean }) {
  return (
    <div>
      <div className="flex items-start justify-between py-[2px]">
        <div className="flex items-center gap-[8px] flex-1 min-w-0">
          <PersonAvatar photo={person.photo} initial={person.initial} />
          <div className="flex flex-col gap-[4px] flex-1 min-w-0">
            <div className="flex items-center gap-[4px]">
              <span
                className="text-[16px] font-semibold leading-[20px] text-[#11301d] whitespace-nowrap"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {person.name}
              </span>
              {person.isLegend && <img src="/images/Food legend.png" alt="Local Foodie" className="w-[16px] h-[16px] object-contain" />}
            </div>
            <span
              className="text-[12px] font-medium leading-[18px] text-[#11301d] whitespace-nowrap"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {person.meta}
            </span>
          </div>
        </div>
        {person.badge && (
          <div
            className="shrink-0 rounded-[8px]"
            style={{
              background: "#fff592",
              padding: "5px 10px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="font-semibold whitespace-nowrap"
              style={{ fontFamily: "Poppins, sans-serif", color: "#11301d", fontSize: 10, lineHeight: 1 }}
            >
              {person.badge}
            </span>
          </div>
        )}
      </div>
      {showDivider && <div className="h-px w-full bg-[rgba(0,0,0,0.05)] mt-[16px]" />}
    </div>
  );
}

function MyListRestaurantRow({ restaurant, meta, type, showDivider }: {
  restaurant: Restaurant;
  meta: string;
  type: "visited" | "saved";
  showDivider: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-[12px] py-[8px]">
        <div className="w-[56px] h-[56px] rounded-[12px] overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-[2px] flex-1 min-w-0">
          <p
            className="text-[14px] font-semibold leading-[18px] text-[#0a0a0a] truncate"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {restaurant.name}
          </p>
          <p
            className="text-[12px] font-medium leading-[18px] text-[#737373]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {meta} · {restaurant.cuisine}
          </p>
          <div className="flex items-center gap-[4px]">
            <Star size={11} fill="#fcd413" className="text-[#fcd413] shrink-0" />
            <span className="text-[11px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {restaurant.rating.toFixed(1).replace(".", ",")} ({restaurant.reviewCount}) · {restaurant.distance}
            </span>
          </div>
        </div>
        {type === "visited" ? (
          <Check size={18} strokeWidth={2.5} className="text-[#11301d] shrink-0" />
        ) : (
          <Heart size={18} className="text-[#53f293] shrink-0" fill="#53f293" />
        )}
      </div>
      {showDivider && <div className="h-px w-full bg-[rgba(0,0,0,0.05)]" />}
    </>
  );
}

function RadiusSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const MIN = 1, MAX = 20;
  const pct = ((value - MIN) / (MAX - MIN)) * 100;

  function updateFromX(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onChange(Math.round(MIN + ratio * (MAX - MIN)));
  }

  return (
    <div className="flex flex-col gap-[16px] pb-[4px]">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Radius from your location</span>
        <span
          className="rounded-[8px] font-semibold"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 13,
            lineHeight: 1,
            color: "#11301d",
            background: "#53f293",
            padding: "5px 10px",
          }}
        >
          {value} km
        </span>
      </div>
      <div
        ref={trackRef}
        className="relative rounded-full cursor-pointer"
        style={{ height: 6, background: "rgba(0,0,0,0.1)", touchAction: "none" }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          updateFromX(e.clientX);
        }}
        onPointerMove={(e) => { if (dragging.current) updateFromX(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
      >
        {/* Filled portion */}
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ width: `${pct}%`, background: "#53f293" }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white"
          style={{
            left: `${pct}%`,
            width: 28, height: 28,
            border: "2.5px solid #53f293",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}
        />
      </div>
      {/* Min / Max labels */}
      <div className="flex items-center justify-between -mt-[8px]">
        <span className="text-[11px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>1 km</span>
        <span className="text-[11px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>20 km</span>
      </div>
    </div>
  );
}

// ─── My List share sheet ─────────────────────────────────────────────────────

function MyListShareSheet({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    { icon: MessageCircle, label: "iMessage",  color: "#34C759" },
    { icon: Share2,         label: "WhatsApp",  color: "#25D366" },
    { icon: Link,           label: "Copy link", color: "#11301d", action: () => { setCopied(true); setTimeout(() => setCopied(false), 2000); } },
    { icon: Share2,         label: "More",      color: "#737373" },
  ];

  return (
    <>
      {/* Scrim */}
      <motion.div
        className="absolute inset-0 z-[70]"
        style={{ background: "rgba(0,0,0,0.45)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      {/* Sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[71] rounded-t-[24px] overflow-hidden"
        style={{ background: "#fff" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-[10px] pb-[4px]">
          <div className="w-[36px] h-[4px] rounded-full bg-[rgba(0,0,0,0.15)]" />
        </div>

        <div className="px-[20px] pt-[8px] pb-[8px]">
          {/* Title */}
          <p className="text-[18px] font-bold text-[#0a0a0a] text-center leading-[24px]"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Share your list
          </p>
          <p className="text-[13px] font-medium text-[#737373] text-center leading-[18px] mt-[2px]"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Let friends & family see where you want to go
          </p>
        </div>

        {/* List preview card */}
        <div className="mx-[20px] mb-[20px] rounded-[16px] p-[14px] flex items-center gap-[12px]"
          style={{ background: "#f5f5f5" }}>
          {/* Thumbnail strip */}
          <div className="flex gap-[3px] shrink-0">
            {MYLIST_ENTRIES.slice(0, 3).map((e, i) => (
              <div key={i} className="w-[36px] h-[36px] rounded-[8px] overflow-hidden" style={{ opacity: 1 - i * 0.15 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.restaurant.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[14px] font-semibold text-[#0a0a0a] leading-[18px] truncate"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Jamie&apos;s list
            </span>
            <span className="text-[12px] font-medium text-[#737373] leading-[16px]"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              {MYLIST_ENTRIES.length} places · NeoTaste
            </span>
          </div>
          <ChevronRight size={16} className="shrink-0 text-[#737373]" />
        </div>

        {/* Share options */}
        <div className="grid grid-cols-4 gap-[8px] px-[20px] mb-[24px]">
          {shareOptions.map(({ icon: Icon, label, color, action }) => (
            <button
              key={label}
              onClick={() => { action?.(); }}
              className="flex flex-col items-center gap-[8px] active:scale-95 transition-transform"
            >
              <div
                className="w-[56px] h-[56px] rounded-[16px] flex items-center justify-center"
                style={{ background: label === "Copy link" && copied ? "#53f293" : "#f5f5f5" }}
              >
                <Icon size={24} style={{ color: label === "Copy link" && copied ? "#11301d" : color }} />
              </div>
              <span className="text-[12px] font-medium text-[#0a0a0a] text-center leading-[15px]"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                {label === "Copy link" && copied ? "Copied!" : label}
              </span>
            </button>
          ))}
        </div>

        {/* Cancel */}
        <div className="px-[20px] pb-[40px]">
          <button
            onClick={onClose}
            className="w-full py-[14px] rounded-[14px] text-[16px] font-semibold active:opacity-70 transition-opacity"
            style={{ background: "#f5f5f5", color: "#0a0a0a", fontFamily: "Poppins, sans-serif" }}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </>
  );
}

function SocialTabContent({ tab, radius, onRadiusChange }: { tab: SocialTab; radius: number; onRadiusChange: (v: number) => void }) {
  const [shareOpen, setShareOpen] = useState(false);

  if (tab === "friends") {
    return (
      <div className="flex flex-col gap-[16px]">
        <RadiusSlider value={radius} onChange={onRadiusChange} />
        <div className="h-px w-full bg-[rgba(0,0,0,0.06)]" />
        <p
          className="text-[14px] font-medium leading-[20px] text-[#0a0a0a]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Your friends
        </p>
        {FRIENDS_LIST.map((p, i) => (
          <PersonRow key={p.name} person={p} showDivider={i < FRIENDS_LIST.length - 1} />
        ))}
      </div>
    );
  }

  if (tab === "legends") {
    return (
      <div className="flex flex-col gap-[16px]">
        <RadiusSlider value={radius} onChange={onRadiusChange} />
        <div className="h-px w-full bg-[rgba(0,0,0,0.06)]" />
        <p
          className="text-[14px] font-medium leading-[20px] text-[#0a0a0a]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Top local foodies in your area who have tried over 100 restaurants
        </p>
        {LEGENDS_LIST.map((p, i) => (
          <PersonRow key={p.name} person={p} showDivider={i < LEGENDS_LIST.length - 1} />
        ))}
      </div>
    );
  }

  // My list tab
  return (
    <div className="flex flex-col gap-[12px]">
      {/* Header meta */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[2px]">
          <p className="text-[14px] font-medium leading-[20px] text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>
            My list
          </p>
          <p className="text-[12px] font-medium leading-[18px] text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {MYLIST_ENTRIES.length} places · 8 friends can see this
          </p>
        </div>
        {/* Share button */}
        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-[7px] px-[14px] py-[9px] rounded-full active:scale-95 transition-transform"
          style={{ background: "#11301d" }}
        >
          <Share2 size={14} style={{ color: "#53f293" }} />
          <span className="text-[13px] font-semibold" style={{ fontFamily: "Poppins, sans-serif", color: "#53f293" }}>
            Share list
          </span>
        </button>
      </div>

      {/* Share sheet */}
      <AnimatePresence>
        {shareOpen && <MyListShareSheet onClose={() => setShareOpen(false)} />}
      </AnimatePresence>

      {/* Dark summary card */}
      <div
        className="rounded-[16px] p-[16px] flex items-center gap-[12px]"
        style={{ background: "#11301d" }}
      >
        {/* Overlapping avatars: 1 photo + 3 coloured initials */}
        <div className="relative shrink-0" style={{ width: 76, height: 34 }}>
          {[
            { photo: "/images/Steve.jpg" },
            { initial: "S", bg: "#53f293", color: "#11301d" },
            { initial: "M", bg: "#fff592", color: "#11301d" },
            { initial: "L", bg: "#f9a8d4", color: "#11301d" },
          ].map((a, i) => (
            <div
              key={i}
              className="absolute w-[34px] h-[34px] rounded-full border-[2px] border-[#11301d] overflow-hidden flex items-center justify-center"
              style={{ left: i * 16, background: "photo" in a ? undefined : a.bg, zIndex: 4 - i }}
            >
              {"photo" in a ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.photo} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[13px] font-semibold" style={{ fontFamily: "Poppins, sans-serif", color: a.color }}>{a.initial}</span>
              )}
            </div>
          ))}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-[2px] flex-1 min-w-0">
          <span className="text-[14px] font-semibold leading-[18px] text-[#53f293]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Visible to 8 friends
          </span>
          <span className="text-[12px] font-medium leading-[16px] text-[rgba(255,255,255,0.7)]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Steve, Mia, Laura + 5 see your list in friends view
          </span>
        </div>

        {/* Toggle */}
        <div className="shrink-0 w-[44px] h-[26px] rounded-full flex items-center px-[3px]" style={{ background: "#53f293" }}>
          <div className="w-[20px] h-[20px] rounded-full bg-white ml-auto" />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-[8px]">
        {/* All — active */}
        <div className="flex items-center gap-[6px] pl-[14px] pr-[6px] py-[8px] rounded-full" style={{ background: "#11301d" }}>
          <span className="text-[14px] font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>All</span>
          <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ background: "#53f293" }}>
            <span className="text-[11px] font-bold text-[#11301d]" style={{ fontFamily: "Poppins, sans-serif" }}>{MYLIST_ENTRIES.length}</span>
          </div>
        </div>
        {/* Visited */}
        <div className="flex items-center gap-[6px] pl-[14px] pr-[6px] py-[8px] rounded-full border border-[rgba(0,0,0,0.12)] bg-white">
          <Check size={14} strokeWidth={2.5} className="text-[#0a0a0a]" />
          <span className="text-[14px] font-semibold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Visited</span>
          <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ background: "#f5f5f5" }}>
            <span className="text-[11px] font-bold text-[#11301d]" style={{ fontFamily: "Poppins, sans-serif" }}>{MYLIST_ENTRIES.filter(e => e.type === "visited").length}</span>
          </div>
        </div>
        {/* Saved */}
        <div className="flex items-center gap-[6px] pl-[14px] pr-[6px] py-[8px] rounded-full border border-[rgba(0,0,0,0.12)] bg-white">
          <Heart size={14} className="text-[#0a0a0a]" fill="#0a0a0a" />
          <span className="text-[14px] font-semibold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Saved</span>
          <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ background: "#f5f5f5" }}>
            <span className="text-[11px] font-bold text-[#11301d]" style={{ fontFamily: "Poppins, sans-serif" }}>{MYLIST_ENTRIES.filter(e => e.type === "saved").length}</span>
          </div>
        </div>
      </div>

      {/* Saved restaurant rows */}
      <div className="flex flex-col gap-[16px]">
        {MYLIST_ENTRIES.map((entry, i) => (
          <MyListRestaurantRow
            key={entry.restaurant.id + entry.type}
            restaurant={entry.restaurant}
            meta={entry.meta}
            type={entry.type}
            showDivider={i < MYLIST_ENTRIES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function SocialSheet({ open, onClose, onShowResults, onReset }: { open: boolean; onClose: () => void; onShowResults: (tab: SocialTab, radius: number) => void; onReset: () => void }) {
  const [tab, setTab] = useState<SocialTab>("friends");
  const [radius, setRadius] = useState(5);

  const TABS = [
    { id: "friends" as SocialTab,  label: "Friends",      sub: "8 friends" },
    { id: "legends" as SocialTab,  label: "Local Foodies", sub: "18 foodies" },
    { id: "mylist"  as SocialTab,  label: "My list",      sub: `${MYLIST_ENTRIES.length} places` },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-40 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="absolute left-0 right-0 bottom-0 z-50 bg-[#fefefe] rounded-t-[24px] flex flex-col"
            style={{
              boxShadow: "0 -5px 6px rgba(160,160,160,0.25)",
              maxHeight: "calc(100dvh - 80px)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.18}
            onDragEnd={(_: unknown, info: PanInfo) => {
              if (info.offset.y > 80 || info.velocity.y > 400) onClose();
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-[8px] pb-[2px] cursor-grab active:cursor-grabbing shrink-0">
              <div className="w-[43px] h-[4px] rounded-full bg-[rgba(0,0,0,0.1)]" />
            </div>

            {/* Header */}
            <div className="px-[16px] pt-[8px] pb-[4px] shrink-0 flex items-start justify-between">
              <div>
                <h2
                  className="text-[28px] font-bold leading-[34px] text-[#0a0a0a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Friends and foodies
                </h2>
                <p
                  className="text-[14px] font-medium leading-[20px] text-[#0a0a0a] mt-[4px]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  See where your friends and local foodies are eating
                </p>
              </div>
              <button
                className="mt-[4px] shrink-0 w-[28px] h-[28px] rounded-full bg-[rgba(0,0,0,0.06)] flex items-center justify-center"
                onClick={onClose}
              >
                <X size={14} className="text-[#0a0a0a]" />
              </button>
            </div>

            {/* Tab switcher */}
            <div className="px-[16px] pt-[12px] pb-[4px] shrink-0">
              <div
                className="flex items-center rounded-[16px] p-[4px]"
                style={{ border: "1px solid rgba(0,0,0,0.1)", background: "#fefefe" }}
              >
                {TABS.map((t) => {
                  const isActive = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      className="flex-1 flex flex-col items-center py-[10px] px-[6px] transition-all duration-150"
                      style={
                        isActive
                          ? { background: "#f5f5f5", border: "2px solid #11301d", borderRadius: 12 }
                          : { borderRadius: 12 }
                      }
                      onClick={() => setTab(t.id)}
                    >
                      <span
                        className="text-[13px] font-semibold leading-[18px] text-[#0a0a0a] whitespace-nowrap"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {t.label}
                      </span>
                      <span
                        className="text-[11px] font-medium leading-[16px] text-[rgba(0,0,0,0.7)] whitespace-nowrap"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {t.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable content */}
            <div
              className="overflow-y-auto flex-1 px-[16px] pt-[12px]"
              style={{ overscrollBehavior: "contain" }}
            >
              <SocialTabContent tab={tab} radius={radius} onRadiusChange={setRadius} />
              {/* Bottom padding so content clears footer */}
              <div className="h-[8px]" />
            </div>

            {/* Footer */}
            <div className="px-[16px] pt-[12px] pb-[8px] flex flex-col gap-[8px] shrink-0 border-t border-[rgba(0,0,0,0.05)]">
              <button
                className="w-full py-[16px] rounded-[16px] text-[16px] font-semibold text-[#0a0a0a] text-center active:opacity-80 transition-opacity"
                style={{ fontFamily: "Poppins, sans-serif", background: "#53f293" }}
                onClick={() => onShowResults(tab, radius)}
              >
                Show {tab === "legends" ? 31 : tab === "mylist" ? MYLIST_ENTRIES.length : 23} results
              </button>
              <button
                onClick={onReset}
                className="w-full py-[14px] rounded-[16px] text-[16px] font-semibold text-[#0a0a0a] text-center active:opacity-70 transition-opacity"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  border: "2px solid rgba(0,0,0,0.05)",
                }}
              >
                Reset filters
              </button>
              {/* Home indicator */}
              <div className="flex justify-center pb-[4px]">
                <div className="w-[134px] h-[5px] rounded-full bg-[#0a0a0a]" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Bottom sheet ─────────────────────────────────────────────────────────────

const PEEK_HEIGHT = 80;  // collapsed: just the grabber + heading visible
const FULL_OFFSET = 120; // distance from top of screen when fully expanded

type SheetState = "peek" | "mid" | "expanded";

function BottomSheet({ tabBarHeight }: { tabBarHeight: number }) {
  const y = useMotionValue(0);
  const [sheetState, setSheetState] = useState<SheetState>("mid");
  const sheetRef = useRef<HTMLDivElement>(null);

  const isExpanded = sheetState === "expanded";

  const sheetHeight: Record<SheetState, string> = {
    peek:     `${tabBarHeight + 24}px`,
    mid:      "52dvh",
    expanded: "100dvh",
  };

  function handleDragEnd(_: unknown, info: PanInfo) {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (sheetState === "peek") {
      if (velocity < -200 || offset < -60) setSheetState("mid");
    } else if (sheetState === "mid") {
      if (velocity < -300 || offset < -80) setSheetState("expanded");
      else if (velocity > 200 || offset > 60) setSheetState("peek");
    } else {
      if (velocity > 200 || offset > 80) setSheetState("mid");
    }
    y.set(0);
  }

  return (
    <motion.div
      ref={sheetRef}
      className="absolute left-0 right-0 bg-[#fefefe] z-20 flex flex-col"
      style={{
        borderRadius: isExpanded ? 0 : "24px 24px 0 0",
        boxShadow: "0 -5px 6px rgba(160,160,160,0.25)",
        bottom: 0,
        y,
      }}
      initial={{ height: sheetHeight.mid }}
      animate={{
        height: sheetHeight[sheetState],
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
      }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
    >
      {/* When expanded the sheet covers the search+chips overlay (top: 56,
          ~48px search, 12px gap, ~40px chips = ~156px). This spacer pushes
          the heading and list clear of those floating controls. */}
      <motion.div
        className="shrink-0"
        animate={{ height: isExpanded ? 160 : 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      />

      {/* Grabber — always visible except when fully expanded */}
      {!isExpanded && (
        <div className="flex justify-center pt-[8px] pb-[4px] shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-[43px] h-[4px] rounded-full bg-[rgba(0,0,0,0.1)]" />
        </div>
      )}

      {/* Heading — shown in peek and mid states */}
      {!isExpanded && (
        <div className="px-[16px] pt-[4px] pb-[8px] shrink-0">
          <h2
            className="text-[20px] font-bold leading-[26px] text-[#0a0a0a]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Browse all deals
          </h2>
        </div>
      )}

      {/* Scrollable list — paddingBottom keeps last item clear of floating nav */}
      <div
        className="overflow-y-auto flex-1 px-[16px]"
        style={{
          overscrollBehavior: "contain",
          paddingBottom: tabBarHeight + 8,
        }}
      >
        {RESTAURANTS.map((r, i) => (
          <RestaurantListItem
            key={r.id}
            restaurant={r}
            showDivider={i < RESTAURANTS.length - 1}
          />
        ))}
      </div>

      {/* Floating Map button — only when fully expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSheetState("mid")}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[8px] px-[20px] py-[14px] rounded-full active:scale-95 transition-transform"
            style={{
              bottom: tabBarHeight + 16,
              background: "#11301d",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              zIndex: 10,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="9" width="3" height="6" rx="1" fill="#53f293"/>
              <rect x="6" y="5" width="3" height="10" rx="1" fill="#53f293"/>
              <rect x="11" y="1" width="3" height="14" rx="1" fill="#53f293"/>
            </svg>
            <span className="text-[15px] font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
              Map
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

function TabBar() {
  const [activeTab, setActiveTab] = useState("discover");

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "feed", label: "Feed", icon: CirclePlay },
    { id: "discover", label: "Discover", icon: MapPin },
    { id: "bookings", label: "Bookings", icon: CalendarCheck },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center pb-[12px] px-[16px] pointer-events-none">
      {/* Floating glass pill */}
      <div
        className="w-full flex items-center justify-around h-[64px] px-[8px] pointer-events-auto"
        style={{
          borderRadius: 28,
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className="flex items-center justify-center flex-1"
              onClick={() => setActiveTab(tab.id)}
              disabled={["home", "feed", "bookings"].includes(tab.id)}
              style={{ opacity: ["home", "feed", "bookings"].includes(tab.id) ? 0.35 : 1 }}
            >
              <div
                className="flex flex-col items-center gap-[3px]"
                style={isActive ? {
                  background: "rgba(0,0,0,0.08)",
                  borderRadius: 99,
                  padding: "6px 18px",
                } : {
                  padding: "6px 10px",
                }}
              >
                <div className="relative">
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.75}
                    className={isActive ? "text-[#0a0a0a]" : "text-[rgba(28,29,40,0.5)]"}
                    fill={isActive ? "#0a0a0a" : "none"}
                  />
                  {isActive && tab.id === "discover" && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: 4 }}>
                      <div className="w-[4px] h-[4px] rounded-full bg-white" />
                    </div>
                  )}
                </div>
                <span
                  className="text-[11px] font-semibold leading-[13px] whitespace-nowrap"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: isActive ? "#0a0a0a" : "rgba(28,29,40,0.5)",
                  }}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {/* iOS home indicator */}
      <div className="w-[134px] h-[5px] rounded-full bg-[#0a0a0a] mt-[8px]" />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const TAB_BAR_HEIGHT = 100; // 64px pill + 12px bottom padding + 24px home indicator

interface DetailContext {
  restaurant: RestaurantBase;
  friendVisit?: FriendVisit;
}

export default function DiscoverPage() {
  const [hasFriends] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [friendsSheetOpen, setFriendsSheetOpen] = useState(false);
  const [socialResultMode, setSocialResultMode] = useState<SocialTab | null>(null);
  const [mapRadius, setMapRadius] = useState<number | null>(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [detail, setDetail] = useState<DetailContext | null>(null);

  function handleOpenDetail(idx: number) {
    if (socialResultMode === "friends") {
      const card = FRIEND_RESULT_CARDS[idx];
      if (!card) return;
      setDetail({
        restaurant: card.restaurant,
        friendVisit: {
          name: card.friendName,
          photo: card.photo,
          initial: card.initial,
          visits: card.visits,
          lastVisitDays: card.lastVisitDays,
          quote: card.quote,
          badge: card.badge,
          groupText: card.groupText,
          isLegend: card.isLegend,
        },
      });
      return;
    }
    if (socialResultMode === "legends") {
      const card = LEGEND_RESULT_CARDS[idx];
      if (!card) return;
      const person = LEGENDS_LIST[idx];
      setDetail({
        restaurant: card.restaurant,
        friendVisit: person ? {
          name: person.name,
          photo: person.photo,
          initial: person.initial,
          visits: card.rebooked > 0 ? card.rebooked : 1,
          lastVisitDays: card.lastVisitDays,
          quote: card.quote,
          badge: card.rebooked > 0 ? `x${card.rebooked} returns` : undefined,
          isLegend: true,
        } : undefined,
      });
      return;
    }
    if (socialResultMode === "mylist") {
      const entry = MYLIST_ENTRIES[idx];
      if (!entry) return;
      setDetail({ restaurant: entry.restaurant });
    }
  }

  function handleFilterTap(id: string) {
    if (id === "friends") {
      setFriendsSheetOpen(true);
      setActiveFilter("friends");
      return;
    }
    setActiveFilter((prev) => (prev === id ? null : id));
  }

  function handleShowResults(tab: SocialTab, radius: number) {
    setSocialResultMode(tab);
    setMapRadius(tab === "mylist" ? null : radius);
    setActiveCardIdx(0);
    setFriendsSheetOpen(false);
    setActiveFilter("friends");
  }

  function handleCloseResults() {
    setSocialResultMode(null);
    setMapRadius(null);
    setActiveFilter(null);
  }

  function handleResetFilters() {
    setSocialResultMode(null);
    setMapRadius(null);
    setActiveFilter(null);
    setActiveCardIdx(0);
    setFriendsSheetOpen(false);
    setDetail(null);
  }

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-[#f2efe9]">
      {/* Map layer */}
      <MapBackground />

      {/* Radius circle — behind pins, centred on user location */}
      {mapRadius !== null && (
        <div
          className="absolute pointer-events-none"
          style={{
            // Anchor at user location; width/height set to diameter so
            // the circle is drawn from its own top-left corner.
            left: "48%",
            top: "52%",
            width: mapRadius * 22,
            height: mapRadius * 22,
            // Shift back by 50% of own size to truly centre on the anchor.
            marginLeft: -(mapRadius * 11),
            marginTop: -(mapRadius * 11),
            borderRadius: "50%",
            background: "rgba(83, 242, 147, 0.13)",
            border: "2px solid rgba(83, 242, 147, 0.6)",
            zIndex: 6,
            transition: "width 0.45s cubic-bezier(0.2,0.9,0.3,1), height 0.45s cubic-bezier(0.2,0.9,0.3,1), margin 0.45s cubic-bezier(0.2,0.9,0.3,1)",
          }}
        />
      )}

      {/* "You" dot — above pins so it's always visible */}
      {mapRadius !== null && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: "48%",
            top: "52%",
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#53f293",
            border: "2.5px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.28)",
            zIndex: 25,
          }}
        />
      )}

      {/* Map pins */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {socialResultMode === "friends" && FRIEND_MAP_PINS.map((pin, i) => (
          <FriendMapPin
            key={i}
            x={pin.x} y={pin.y}
            person={FRIENDS_LIST[pin.personIdx]}
            hasReturnVisit={(FRIEND_RESULT_CARDS[i]?.visits ?? 0) > 1}
            hasFavourited={FRIEND_RESULT_CARDS[i]?.favourited ?? false}
            extraFriends={FRIEND_RESULT_CARDS[i]?.extraFriends}
            active={i === activeCardIdx}
            onClick={() => setActiveCardIdx(i)}
          />
        ))}
        {socialResultMode === "legends" && LEGEND_MAP_PINS.map((pin, i) => (
          <LegendMapPin
            key={i}
            x={pin.x} y={pin.y}
            count={pin.count}
            hasReturnVisit={(LEGEND_RESULT_CARDS[i]?.rebooked ?? 0) > 0}
            active={i === activeCardIdx}
            onClick={() => setActiveCardIdx(i)}
          />
        ))}
        {socialResultMode === "mylist" && MYLIST_MAP_PINS.map((pin, i) => (
          <MyListMapPin
            key={i}
            x={pin.x} y={pin.y}
            type={MYLIST_ENTRIES[i]?.type ?? "saved"}
            active={i === activeCardIdx}
            onClick={() => setActiveCardIdx(i)}
          />
        ))}
        {!socialResultMode && MAP_PINS.map((pin, i) => (
          <NeoPin key={i} x={pin.x} y={pin.y} />
        ))}
      </div>

      {/* Status bar */}
      <StatusBar />

      {/* Floating top controls */}
      <div
        className="absolute left-[16px] right-[16px] z-[25] flex flex-col gap-[12px]"
        style={{ top: 56 }}
      >
        <div
          className="flex items-center gap-[8px] bg-[#fefefe] rounded-[32px] px-[16px] py-[12px]"
          style={{ border: "1.5px solid rgba(0,0,0,0.12)" }}
        >
          <Search size={16} className="text-[rgba(0,0,0,0.5)] shrink-0" />
          <span
            className="text-[16px] font-medium leading-[24px] text-[rgba(0,0,0,0.5)]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Search deals &amp; more
          </span>
        </div>
        <FilterChips
          hasFriends={hasFriends}
          activeFilter={activeFilter}
          socialResultMode={socialResultMode}
          onFilterTap={handleFilterTap}
        />
      </div>

      {/* Location button */}
      <button
        className="absolute z-20 right-[16px] w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center active:scale-95 transition-transform duration-100"
        style={{
          bottom: socialResultMode ? TAB_BAR_HEIGHT + 220 : TAB_BAR_HEIGHT + 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          transition: "bottom 0.3s ease",
        }}
      >
        <Navigation size={20} className="text-[#0a0a0a]" fill="#0a0a0a" />
      </button>

      {/* Regular bottom sheet — hidden in social result mode */}
      {!socialResultMode && <BottomSheet tabBarHeight={TAB_BAR_HEIGHT} />}

      {/* Social result strip */}
      <AnimatePresence>
        {socialResultMode && (
          <SocialResultStrip
            mode={socialResultMode}
            activeIdx={activeCardIdx}
            setActiveIdx={setActiveCardIdx}
            onClose={handleCloseResults}
            onOpenDetail={handleOpenDetail}
          />
        )}
      </AnimatePresence>

      {/* Restaurant detail overlay */}
      <AnimatePresence>
        {detail && (
          <RestaurantDetail
            restaurant={detail.restaurant}
            friendVisit={detail.friendVisit}
            onClose={() => setDetail(null)}
          />
        )}
      </AnimatePresence>

      {/* Social sheet */}
      <SocialSheet
        open={friendsSheetOpen}
        onClose={() => { setFriendsSheetOpen(false); setActiveFilter(null); }}
        onShowResults={handleShowResults}
        onReset={handleResetFilters}
      />

      {/* Tab bar */}
      <TabBar />
    </div>
  );
}
