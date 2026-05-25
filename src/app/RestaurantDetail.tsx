"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft, Star, BookOpen, MapPin, Heart, Share2, Info,
  Zap, BarChart3, RotateCcw, Phone, Copy, Clock, ChevronDown,
  Flag, ExternalLink,
} from "lucide-react";
import { BookingConfirmation } from "./BookingConfirmation";

export interface RestaurantBase {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  distance: string;
  image: string;
  deals: string[];
}

export interface FriendVisit {
  name: string;
  photo?: string;
  initial: string;
  visits: number;
  lastVisitDays: number;
  quote: string;
  badge?: string;
  groupText?: string;
  isLegend?: boolean;
}

// Static detail data — same set for every restaurant in this prototype.
const HERO_THUMBS = ["/images/burger and chips 1.jpg", "/images/burgers.jpg"];

interface Review {
  name: string;
  photo?: string;
  initial: string;
  rating: number;
  time: string;
  body: string;
  photos: string[];
  likes: number;
}

const REVIEWS: Review[] = [
  {
    name: "Johanna",
    photo: "/images/Laura.jpg",
    initial: "J",
    rating: 5,
    time: "3 weeks ago",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    photos: ["/images/food.jpg", "/images/burger and chips.jpg"],
    likes: 16,
  },
  {
    name: "Tung Anh",
    initial: "T",
    rating: 2,
    time: "1 week ago",
    body: "War super lecker",
    photos: [],
    likes: 4,
  },
];

interface SimilarRestaurant {
  name: string;
  image: string;
  redemptions: string;
  rating: number;
  reviews: number;
  distance: string;
  cuisine: string;
  deals: string[];
}

const SIMILAR: SimilarRestaurant[] = [
  { name: "Home of Burger",   image: "/images/burger and chips 1.jpg", redemptions: "700+", rating: 4.7, reviews: 336, distance: "25 m", cuisine: "Burgers, Asian", deals: ["€10 Discount", "FREE Fries"] },
  { name: "Ali Baba Burger",  image: "/images/burgers.jpg",            redemptions: "350+", rating: 4.7, reviews: 164, distance: "60 m", cuisine: "Burgers",        deals: ["2for1 Burger"] },
  { name: "Sakura Ramen",     image: "/images/asian food.jpg",         redemptions: "240+", rating: 4.7, reviews: 521, distance: "120 m", cuisine: "Japanisch",     deals: ["Free Gyoza"] },
];

// ─── Status bar (duplicated from page.tsx for cleanliness) ───────────────────

function StatusBar() {
  return (
    <div className="h-[54px] flex items-end justify-between px-5 pb-2 shrink-0">
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 15, lineHeight: "20px", letterSpacing: "-0.3px", color: "#0a0a0a" }}>9:41</span>
      <div className="flex items-center gap-[5px]">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.8" fill="#0a0a0a" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" fill="#0a0a0a" />
          <rect x="9" y="2" width="3" height="10" rx="0.8" fill="#0a0a0a" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="#0a0a0a" opacity="0.3" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#0a0a0a" />
          <path d="M3.5 6.5C4.9 5.1 6.4 4.4 8 4.4s3.1.7 4.5 2.1" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 3.5C3 1.5 5.4 0.5 8 0.5s5 1 7 3" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#0a0a0a" strokeOpacity="0.35" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="#0a0a0a" />
          <path d="M22.5 4v4a2 2 0 000-4z" fill="#0a0a0a" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ─── Friend proof block ──────────────────────────────────────────────────────

function FriendProofBlock({ visit }: { visit: FriendVisit }) {
  const lastBooked =
    visit.lastVisitDays === 1 ? "yesterday"
    : visit.lastVisitDays < 5 ? `${visit.lastVisitDays} days ago`
    : visit.lastVisitDays < 11 ? "1 week ago"
    : visit.lastVisitDays < 18 ? "2 weeks ago"
    : `${Math.round(visit.lastVisitDays / 7)} weeks ago`;
  return (
    <div
      className="mx-[16px] mt-[16px] rounded-[16px] p-[12px]"
      style={{ background: "rgba(17,48,29,0.05)", border: "1px solid rgba(17,48,29,0.08)" }}
    >
      <div className="flex items-start gap-[10px]">
        <div className="relative shrink-0">
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden flex items-center justify-center" style={{ background: visit.photo ? undefined : "#53f293" }}>
            {visit.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={visit.photo} alt={visit.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[13px] font-bold text-[#11301d]" style={{ fontFamily: "Poppins, sans-serif" }}>{visit.initial}</span>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-[8px]">
            <div className="flex flex-col min-w-0">
              {/* Name + optional legend label */}
              <div className="flex items-center gap-[6px] flex-wrap">
                <span className="text-[13px] font-semibold text-[#11301d] leading-[18px]" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {visit.name}
                </span>
                {visit.isLegend && (
                  <div className="flex items-center gap-[4px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/Food legend.png" alt="" style={{ width: 12, height: 12, objectFit: "contain" }} />
                    <span className="text-[11px] font-medium italic leading-[16px]" style={{ fontFamily: "Poppins, sans-serif", color: "rgba(17,48,29,0.7)" }}>
                      Local foodie
                    </span>
                  </div>
                )}
              </div>
              {visit.groupText && (
                <span className="text-[11px] font-medium leading-[16px]" style={{ fontFamily: "Poppins, sans-serif", color: "rgba(17,48,29,0.65)" }}>
                  {visit.groupText}
                </span>
              )}
            </div>
            {visit.badge && (
              <span
                className="shrink-0 text-[10px] font-semibold whitespace-nowrap"
                style={{ fontFamily: "Poppins, sans-serif", color: "rgba(17,48,29,0.7)" }}
              >
                {visit.badge}
              </span>
            )}
          </div>
          <p className="text-[12px] font-medium leading-[17px] mt-[4px]" style={{ fontFamily: "Poppins, sans-serif", color: "rgba(17,48,29,0.8)" }}>
            &ldquo;{visit.quote}&rdquo;
          </p>
          <p className="text-[11px] font-medium leading-[14px] mt-[6px]" style={{ fontFamily: "Poppins, sans-serif", color: "rgba(17,48,29,0.55)" }}>
            Last booked {lastBooked}
          </p>
        </div>
      </div>

      {/* Local foodie community pill */}
      {visit.isLegend && (
        <div className="mt-[10px] flex items-center gap-[6px] px-[8px] py-[5px] rounded-full self-start" style={{ background: "rgba(17,48,29,0.06)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Food legend.png" alt="" style={{ width: 12, height: 12, objectFit: "contain" }} />
          <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 11, lineHeight: "14px", color: "rgba(17,48,29,0.75)" }}>
            5 local foodies ate here last month
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Action buttons row ──────────────────────────────────────────────────────

function ActionButtonsRow() {
  const buttons = [
    { label: "Menu",     Icon: BookOpen },
    { label: "Location", Icon: MapPin },
    { label: "Save",     Icon: Heart },
    { label: "Share",    Icon: Share2 },
  ];
  return (
    <div className="px-[16px] mt-[20px] flex items-center gap-[6px]">
      {buttons.map(({ label, Icon }) => (
        <button
          key={label}
          className="flex-1 flex items-center justify-center gap-[5px] py-[9px] rounded-full border active:scale-[0.97] transition-transform"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <Icon size={14} className="text-[#0a0a0a]" />
          <span className="text-[12px] font-semibold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Hero images ─────────────────────────────────────────────────────────────

function HeroImages({ hero }: { hero: string }) {
  return (
    <div className="px-[16px] mt-[16px]">
      <div className="flex gap-[6px] h-[180px]">
        <div className="flex-1 rounded-[16px] overflow-hidden bg-[#f4f4f4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-[92px] flex flex-col gap-[6px]">
          {HERO_THUMBS.map((src, i) => (
            <div key={i} className="flex-1 rounded-[16px] overflow-hidden bg-[#f4f4f4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab nav (visual only) ───────────────────────────────────────────────────

function TabNav() {
  const tabs = ["Overview", "Reviews", "About"];
  return (
    <div className="mt-[20px] mx-[16px] border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <div className="flex gap-[24px]">
        {tabs.map((label, i) => {
          const active = i === 0;
          return (
            <div
              key={label}
              className="pb-[10px]"
              style={{ borderBottom: active ? "2px solid #11301d" : "2px solid transparent", marginBottom: "-1px" }}
            >
              <span
                className="text-[14px]"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#0a0a0a" : "#737373",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Deals section ───────────────────────────────────────────────────────────

function DealCard({ variant, name, avg, validity, description, onBook }: {
  variant: "dark" | "light";
  name: string; avg: string; validity: string; description: string;
  onBook?: () => void;
}) {
  const isDark = variant === "dark";
  const accent = isDark ? "#53f293" : "#11301d";
  const muted  = isDark ? "rgba(255,255,255,0.7)" : "rgba(17,48,29,0.7)";
  return (
    <div className="rounded-[18px] p-[16px] mb-[12px]" style={{ background: isDark ? "#11301d" : "#bafad4" }}>
      <div className="flex items-center gap-[8px]">
        <Zap size={18} className="shrink-0" style={{ color: accent }} fill={accent} />
        <span
          className="text-[20px] font-bold leading-[26px]"
          style={{ fontFamily: "Poppins, sans-serif", color: isDark ? "#fefefe" : "#0a0a0a" }}
        >
          {name}
        </span>
      </div>
      <div className="flex items-center gap-[14px] mt-[8px]">
        <div className="flex items-center gap-[5px]">
          <BarChart3 size={12} style={{ color: accent }} />
          <span className="text-[12px] font-medium" style={{ fontFamily: "Poppins, sans-serif", color: muted }}>Avg. {avg}</span>
        </div>
        <div className="flex items-center gap-[5px]">
          <RotateCcw size={12} style={{ color: accent }} />
          <span className="text-[12px] font-medium" style={{ fontFamily: "Poppins, sans-serif", color: muted }}>{validity}</span>
        </div>
      </div>
      <p
        className="text-[13px] font-medium mt-[10px] leading-[19px]"
        style={{ fontFamily: "Poppins, sans-serif", color: isDark ? "rgba(255,255,255,0.9)" : "#0a0a0a" }}
      >
        {description}
      </p>
      <button
        onClick={onBook}
        className="w-full mt-[14px] py-[12px] rounded-[14px] text-[15px] font-semibold active:opacity-80 transition-opacity"
        style={{ background: "#53f293", color: "#0a0a0a", fontFamily: "Poppins, sans-serif" }}
      >
        Book deal
      </button>
    </div>
  );
}

function DealsSection({ deals, onBook }: { deals: string[]; onBook?: (dealName: string) => void }) {
  const primary = deals[0] || "Featured Deal";
  const secondary = deals[1];
  return (
    <div className="px-[16px] mt-[20px]">
      <div className="flex items-center justify-between mb-[12px]">
        <h2 className="text-[20px] font-bold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Deals</h2>
        <button className="flex items-center gap-[4px] px-[10px] py-[4px] rounded-full bg-[rgba(0,0,0,0.05)] active:scale-95 transition-transform">
          <Info size={14} className="text-[#0a0a0a]" />
          <span className="text-[12px] font-semibold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Info</span>
        </button>
      </div>
      <DealCard
        variant="dark"
        name={primary}
        avg="€25"
        validity="Limited"
        description="Bestelle einen PiCaccia Parma und zahle nur 3€!"
        onBook={() => onBook?.(primary)}
      />
      {secondary && (
        <DealCard
          variant="light"
          name={secondary}
          avg="€25"
          validity="90 days"
          description="You order 2 coffee-dessert bundles of your choice and receive a 50% discount on both."
          onBook={() => onBook?.(secondary)}
        />
      )}
    </div>
  );
}

// ─── Reviews section ─────────────────────────────────────────────────────────

function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="mb-[20px]">
      <div className="flex items-center gap-[10px] mb-[8px]">
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center shrink-0" style={{ background: review.photo ? undefined : "#bafad4" }}>
          {review.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={review.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[14px] font-bold text-[#11301d]" style={{ fontFamily: "Poppins, sans-serif" }}>{review.initial}</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold text-[#0a0a0a] leading-[18px]" style={{ fontFamily: "Poppins, sans-serif" }}>{review.name}</span>
          <div className="flex items-center gap-[6px]">
            <div className="flex gap-[1px]">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  size={10}
                  fill={i <= review.rating ? "#fcd413" : "none"}
                  className={i <= review.rating ? "text-[#fcd413]" : "text-[#d4d4d4]"}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>· {review.time}</span>
          </div>
        </div>
      </div>
      <p className="text-[13px] font-medium text-[#0a0a0a] leading-[19px]" style={{ fontFamily: "Poppins, sans-serif" }}>{review.body}</p>
      {review.photos.length > 0 && (
        <div className="flex gap-[6px] mt-[10px]">
          {review.photos.map((p, i) => (
            <div key={i} className="w-[120px] h-[120px] rounded-[12px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-[4px] mt-[8px]">
        <Heart size={14} className="text-[#53f293]" fill="#53f293" />
        <span className="text-[12px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>{review.likes}</span>
      </div>
    </div>
  );
}

function ReviewsSection({ rating }: { rating: number }) {
  return (
    <div className="px-[16px] mt-[24px]">
      <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-[10px]" style={{ fontFamily: "Poppins, sans-serif" }}>Reviews</h2>
      <div className="flex items-center gap-[10px] mb-[18px]">
        <span className="text-[34px] font-bold text-[#0a0a0a] leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>
          {rating.toFixed(1).replace(".", ",")}
        </span>
        <div className="flex gap-[2px]">
          {[1,2,3,4,5].map(i => (
            <Star
              key={i}
              size={18}
              fill={i <= Math.round(rating) ? "#0a0a0a" : "none"}
              className={i <= Math.round(rating) ? "text-[#0a0a0a]" : "text-[#d4d4d4]"}
            />
          ))}
        </div>
      </div>
      {REVIEWS.map((r, i) => (
        <ReviewItem key={i} review={r} />
      ))}
      <button
        className="w-full mt-[4px] py-[14px] rounded-full bg-[#f5f5f5] text-[14px] font-semibold text-[#0a0a0a] active:opacity-80 transition-opacity"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        See all reviews
      </button>
    </div>
  );
}

// ─── About section ───────────────────────────────────────────────────────────

function AboutMap() {
  // Same tile approach as the main map, but tighter and capped to one row
  const tiles = [{ x: 17601, y: 10749 }, { x: 17602, y: 10749 }];
  return (
    <div className="h-[140px] rounded-[16px] overflow-hidden bg-[#f2efe9] relative">
      <div className="absolute" style={{ left: -60, top: -60, width: 512, height: 256, display: "grid", gridTemplateColumns: "repeat(2, 256px)" }}>
        {tiles.map(({ x, y }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${x}-${y}`} src={`https://a.basemaps.cartocdn.com/light_all/15/${x}/${y}.png`} alt="" width={256} height={256} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center"
          style={{
            width: 40, height: 48, position: "relative",
          }}
        >
          <div
            style={{
              width: 40, height: 40, borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)", background: "#53f293",
              border: "2.5px solid white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/N.png" alt="" style={{ transform: "rotate(45deg)", width: 18, height: 18, objectFit: "contain" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="px-[16px] mt-[24px]">
      <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-[12px]" style={{ fontFamily: "Poppins, sans-serif" }}>About</h2>
      <AboutMap />
      <div className="flex gap-[8px] mt-[12px]">
        <button className="flex-1 flex items-center justify-center gap-[6px] py-[10px] rounded-full border active:scale-[0.97] transition-transform" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
          <ExternalLink size={14} className="text-[#0a0a0a]" />
          <span className="text-[13px] font-semibold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Open on maps</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-[6px] py-[10px] rounded-full border active:scale-[0.97] transition-transform" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
          <Phone size={14} className="text-[#0a0a0a]" />
          <span className="text-[13px] font-semibold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Call</span>
        </button>
      </div>
      <div className="flex items-start gap-[12px] py-[12px] mt-[8px] border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
        <MapPin size={18} className="text-[#0a0a0a] shrink-0 mt-[2px]" />
        <div className="flex-1 min-w-0">
          <span className="text-[14px] font-medium text-[#0a0a0a] block leading-[18px]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Tamara-Danz-Str. 11, 10243 Berlin
          </span>
          <span className="text-[12px] text-[#737373] leading-[16px]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Friedrichshain (1,3 km away)
          </span>
        </div>
        <button className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
          <Copy size={14} className="text-[#0a0a0a]" />
        </button>
      </div>
      <div className="flex items-center gap-[12px] py-[12px] border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
        <Clock size={18} className="text-[#0a0a0a] shrink-0" />
        <div className="flex-1 min-w-0 flex items-center gap-[6px]">
          <span className="text-[14px] font-medium text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Open</span>
          <span className="w-[3px] h-[3px] rounded-full bg-[#737373]" />
          <span className="text-[14px] font-medium text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>Closes at 22:30</span>
        </div>
        <button className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
          <ChevronDown size={16} className="text-[#0a0a0a]" />
        </button>
      </div>
    </div>
  );
}

// ─── Similar restaurants ─────────────────────────────────────────────────────

function SimilarRestaurants() {
  return (
    <div className="mt-[24px]">
      <h2 className="text-[20px] font-bold text-[#0a0a0a] mb-[12px] px-[16px]" style={{ fontFamily: "Poppins, sans-serif" }}>
        Similar Restaurants
      </h2>
      <div className="flex gap-[12px] overflow-x-auto scrollbar-hide px-[16px] pb-[8px] snap-x snap-mandatory">
        {SIMILAR.map((s, i) => (
          <div
            key={i}
            className="shrink-0 snap-start w-[220px] rounded-[18px] overflow-hidden bg-white"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
          >
            <div className="relative h-[120px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              <div className="absolute top-[8px] left-[8px] px-[8px] py-[3px] rounded-full" style={{ background: "rgba(0,0,0,0.6)" }}>
                <span className="text-[10px] font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{s.redemptions} redemptions</span>
              </div>
              <button className="absolute top-[8px] right-[8px] w-[28px] h-[28px] rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
                <Heart size={14} className="text-[#0a0a0a]" />
              </button>
            </div>
            <div className="p-[10px]">
              <span className="text-[14px] font-bold text-[#0a0a0a] leading-[18px] truncate block" style={{ fontFamily: "Poppins, sans-serif" }}>
                {s.name}
              </span>
              <div className="flex items-center gap-[4px] mt-[2px]">
                <Star size={11} fill="#fcd413" className="text-[#fcd413] shrink-0" />
                <span className="text-[11px] font-medium text-[#737373] truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {s.rating.toFixed(1).replace(".", ",")} ({s.reviews}) · {s.distance} · {s.cuisine}
                </span>
              </div>
              <div className="flex gap-[4px] mt-[6px]">
                {s.deals.map(d => (
                  <span key={d} className="px-[6px] py-[2px] rounded-full text-[10px] font-semibold text-[#0a0a0a] whitespace-nowrap" style={{ background: "#53f293", fontFamily: "Poppins, sans-serif" }}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main detail component ──────────────────────────────────────────────────

export function RestaurantDetail({ restaurant, friendVisit, onClose }: {
  restaurant: RestaurantBase;
  friendVisit?: FriendVisit;
  onClose: () => void;
}) {
  const [bookedDeal, setBookedDeal] = useState<string | null>(null);

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-white flex flex-col overflow-hidden"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 32, stiffness: 320 }}
    >
      <StatusBar />

      {/* Back arrow */}
      <div className="px-[16px] pt-[2px] shrink-0">
        <button
          onClick={onClose}
          className="w-[40px] h-[40px] flex items-center justify-start active:scale-95 transition-transform"
        >
          <ChevronLeft size={26} className="text-[#0a0a0a]" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
        {/* Title block */}
        <div className="px-[16px] pt-[4px]">
          <h1 className="text-[28px] font-bold text-[#0a0a0a] leading-[34px]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {restaurant.name}
          </h1>
          <div className="flex items-center gap-[6px] mt-[6px]">
            <Star size={13} fill="#0a0a0a" className="text-[#0a0a0a]" />
            <span className="text-[13px] font-semibold text-[#0a0a0a]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {restaurant.rating.toFixed(1).replace(".", ",")}
            </span>
            <span className="text-[13px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>
              ({restaurant.reviewCount})
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#737373]" />
            <span className="text-[13px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>{restaurant.cuisine}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#737373]" />
            <span className="text-[13px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>€€€€</span>
          </div>
          <div className="flex items-center gap-[6px] mt-[4px]">
            <span className="text-[12px] font-semibold" style={{ fontFamily: "Poppins, sans-serif", color: "#1c8a4a" }}>Open</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#737373]" />
            <span className="text-[12px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>Closes at 20:00</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#737373]" />
            <span className="text-[12px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>District ({restaurant.distance})</span>
          </div>
        </div>

        {friendVisit && <FriendProofBlock visit={friendVisit} />}

        <ActionButtonsRow />
        <HeroImages hero={restaurant.image} />
        <TabNav />
        <DealsSection deals={restaurant.deals} onBook={setBookedDeal} />
        <ReviewsSection rating={restaurant.rating} />
        <AboutSection />
        <SimilarRestaurants />

        {/* Report issue */}
        <div className="px-[16px] py-[24px] flex items-center gap-[6px]">
          <Flag size={14} className="text-[#737373]" />
          <span className="text-[13px] font-medium text-[#737373]" style={{ fontFamily: "Poppins, sans-serif" }}>Report issue</span>
        </div>

        {/* iOS home indicator spacer */}
        <div className="h-[20px]" />
      </div>

      {/* Booking confirmation overlay */}
      <AnimatePresence>
        {bookedDeal && (
          <BookingConfirmation
            restaurantName={restaurant.name}
            restaurantImage={restaurant.image}
            dealName={bookedDeal}
            onSeeBooking={onClose}
            onContinue={onClose}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
