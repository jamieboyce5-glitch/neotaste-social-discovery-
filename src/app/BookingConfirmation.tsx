"use client";

import { motion } from "motion/react";
import { Gift, RotateCcw, ChevronRight, UserPlus } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BookingConfirmationProps {
  restaurantName: string;
  restaurantImage: string;
  dealName: string;
  onSeeBooking: () => void;
  onContinue: () => void;
}

// ─── White status bar for dark background ────────────────────────────────────

function DarkStatusBar() {
  return (
    <div className="h-[54px] flex items-end justify-between px-5 pb-2 shrink-0">
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: 15,
          lineHeight: "20px",
          color: "#fefefe",
        }}
      >
        9:41
      </span>
      <div className="flex items-center gap-[5px]">
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.8" fill="#fefefe" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" fill="#fefefe" />
          <rect x="9" y="2" width="3" height="10" rx="0.8" fill="#fefefe" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="#fefefe" opacity="0.3" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#fefefe" />
          <path d="M3.5 6.5C4.9 5.1 6.4 4.4 8 4.4s3.1.7 4.5 2.1" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 3.5C3 1.5 5.4 0.5 8 0.5s5 1 7 3" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#fefefe" strokeOpacity="0.35" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="#fefefe" />
          <path d="M22.5 4v4a2 2 0 000-4z" fill="#fefefe" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ─── NeoTaste logo overlay ────────────────────────────────────────────────────

function NeoTasteLogo() {
  return (
    <div
      className="flex items-center gap-[8px] px-[14px] py-[8px] rounded-[14px]"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
    >
      {/* N icon box */}
      <div
        className="w-[26px] h-[26px] rounded-[6px] flex items-center justify-center shrink-0"
        style={{ background: "#fefefe" }}
      >
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: 15,
            color: "#08180f",
            lineHeight: 1,
          }}
        >
          N
        </span>
      </div>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: "#fefefe",
          lineHeight: 1,
          letterSpacing: "-0.3px",
        }}
      >
        NeoTaste
      </span>
    </div>
  );
}

// ─── Ticket divider with punch-circles ───────────────────────────────────────

function TicketDivider() {
  return (
    <div className="relative flex items-center w-full my-[4px]">
      {/* Left punch */}
      <div
        className="absolute -left-[16px] w-[12px] h-[12px] rounded-full shrink-0"
        style={{ background: "#fefefe" }}
      />
      {/* Dashed line */}
      <div className="flex-1 border-t border-dashed" style={{ borderColor: "rgba(0,0,0,0.15)" }} />
      {/* Right punch */}
      <div
        className="absolute -right-[16px] w-[12px] h-[12px] rounded-full shrink-0"
        style={{ background: "#fefefe" }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BookingConfirmation({
  restaurantName,
  restaurantImage,
  dealName,
  onSeeBooking,
  onContinue,
}: BookingConfirmationProps) {
  return (
    <motion.div
      className="absolute inset-0 z-[60] flex flex-col overflow-hidden"
      style={{ background: "#08180f" }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 32, stiffness: 300 }}
    >
      <DarkStatusBar />

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
        {/* ── Heading ── */}
        <div className="px-[16px] pt-[4px] pb-[28px] text-center">
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: "30px",
              color: "#fefefe",
            }}
          >
            Your{" "}
            <em style={{ color: "#53f293", fontStyle: "italic" }}>delicious</em>{" "}
            deal at
            <br />
            {restaurantName} awaits!
          </h1>
        </div>

        {/* ── Card ── */}
        <div className="px-[16px]">
          <div
            className="w-full rounded-[24px] overflow-hidden"
            style={{ background: "#fefefe" }}
          >
            {/* Hero image with logo */}
            <div className="relative h-[168px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={restaurantImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 100%)" }}
              />
              {/* Logo centred */}
              <div className="absolute inset-0 flex items-center justify-center">
                <NeoTasteLogo />
              </div>
            </div>

            {/* Restaurant name + address */}
            <div className="px-[16px] pt-[14px] pb-[12px]">
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  lineHeight: "30px",
                  color: "#0a0a0a",
                }}
              >
                {restaurantName}
              </p>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: "20px",
                  color: "rgba(0,0,0,0.5)",
                  marginTop: 2,
                }}
              >
                Oranienstraße 204, 10999 Berlin
              </p>
            </div>

            {/* Thin divider */}
            <div className="mx-[16px]" style={{ height: 1, background: "rgba(0,0,0,0.08)" }} />

            {/* ── Deal card ── */}
            <div className="px-[16px] py-[14px]">
              <div
                className="w-full rounded-[16px] px-[16px] pt-[14px] pb-[14px] relative overflow-hidden"
                style={{ background: "#e5e5e5" }}
              >
                {/* Deal name */}
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    lineHeight: "26px",
                    color: "#11301d",
                  }}
                >
                  {dealName}
                </p>

                {/* Icons row */}
                <div className="flex items-center gap-[16px] mt-[8px]">
                  <div className="flex items-center gap-[5px]">
                    <Gift size={12} style={{ color: "#11301d" }} />
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: 12,
                        lineHeight: "16px",
                        color: "#11301d",
                      }}
                    >
                      Avg. €25
                    </span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <RotateCcw size={12} style={{ color: "#11301d" }} />
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: 12,
                        lineHeight: "16px",
                        color: "#11301d",
                      }}
                    >
                      30 days
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: 12,
                    lineHeight: "18px",
                    color: "#11301d",
                    marginTop: 8,
                  }}
                >
                  You order 2 main items of your choice, the cheaper/equally priced one will not be charged.
                </p>

                {/* Ticket punch divider */}
                <div className="mt-[14px] mb-[12px]">
                  <TicketDivider />
                </div>

                {/* Redeem on */}
                <div>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    Redeem on
                  </p>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontSize: 20,
                      lineHeight: "26px",
                      color: "#737373",
                      marginTop: 2,
                    }}
                  >
                    Wed, Jul 23 | 8:00–22:00
                  </p>
                </div>

                {/* Separator */}
                <div className="mt-[12px] mb-[12px]" style={{ height: 1, background: "rgba(0,0,0,0.05)" }} />

                {/* Bringing someone row */}
                <button
                  className="flex items-center gap-[10px] w-full active:opacity-70 transition-opacity"
                >
                  {/* Circle + icon */}
                  <div
                    className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 border-[1.5px] border-dashed"
                    style={{ borderColor: "rgba(17,48,29,0.4)" }}
                  >
                    <UserPlus size={13} style={{ color: "#11301d" }} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: "20px",
                        color: "#11301d",
                      }}
                    >
                      Bringing someone?
                    </p>
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        fontSize: 12,
                        lineHeight: "18px",
                        color: "#11301d",
                      }}
                    >
                      It&apos;s a 2for1, send them a heads up
                    </p>
                  </div>
                  <ChevronRight size={18} style={{ color: "#11301d", flexShrink: 0 }} />
                </button>
              </div>
            </div>

            {/* Bottom thin divider */}
            <div className="mx-[16px] mb-[4px]" style={{ height: 1, background: "rgba(0,0,0,0.08)" }} />
            <div className="h-[4px]" />
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="px-[16px] pt-[24px] pb-[40px] flex flex-col gap-[16px] items-center">
          <button
            onClick={onSeeBooking}
            className="w-full py-[16px] rounded-[16px] text-[16px] font-semibold active:opacity-80 transition-opacity"
            style={{
              background: "#53f293",
              color: "#0a0a0a",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            See my booking
          </button>
          <button
            onClick={onContinue}
            className="text-[16px] font-normal active:opacity-60 transition-opacity"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#fefefe",
            }}
          >
            Continue discovering
          </button>
        </div>
      </div>
    </motion.div>
  );
}
