import type { Locale, SchematicId } from "@/content/types";
import { Figure, Step, Note, Arrow, ArrowLabel } from "./kit";

type Draw = (t: (tr: string, en: string) => string) => React.JSX.Element;

const localize = (locale: Locale) => (tr: string, en: string) => (locale === "tr" ? tr : en);

/* ── NAC System ─────────────────────────────────────────────────
   Claim: a device gets no network until the policy engine has said
   which VLAN it belongs on.
   ───────────────────────────────────────────────────────────── */

const nacSystem: Draw = (t) => (
  <Figure
    width={700}
    height={310}
    label={t(
      "Bir cihazın ağa girerken izlediği RADIUS kimlik doğrulama yolu",
      "The RADIUS authentication path a device follows when joining the network",
    )}
    caption={t(
      "Cihaz doğrudan ağa giremez. Anahtar isteği FreeRADIUS'a taşır, karar politika motorundan döner ve cihaz ancak kendisine ayrılan VLAN'a yerleşir.",
      "A device never joins directly. The switch relays the request to FreeRADIUS, the decision comes back from the policy engine, and only then does the device land on its assigned VLAN.",
    )}
  >
    <Step x={14} y={40} w={146} h={58} n={1} label={t("Cihaz", "Device")} sub="802.1X" />
    <Step x={189} y={40} w={146} h={58} n={2} label={t("Anahtar", "Switch")} sub="NAS" />
    <Step x={364} y={40} w={146} h={58} n={3} label="FreeRADIUS" sub={t("kimliği doğrular", "authenticates")} />
    <Step
      x={539}
      y={40}
      w={146}
      h={58}
      n={4}
      label={t("Politika motoru", "Policy engine")}
      sub="FastAPI"
      accent
    />

    <Arrow d="M 160 69 L 183 69" />
    <ArrowLabel x={172} y={32}>
      Access-Request
    </ArrowLabel>
    <Arrow d="M 335 69 L 358 69" />
    <ArrowLabel x={347} y={32}>
      {t("iletir", "relays")}
    </ArrowLabel>
    <Arrow d="M 510 69 L 533 69" />
    <ArrowLabel x={522} y={32}>
      {t("sorar", "asks")}
    </ArrowLabel>

    {/* Stores hang off the steps that use them */}
    <Note x={364} y={168} w={146} h={50} label="PostgreSQL" sub={t("kullanıcı kayıtları", "user records")} />
    <Note x={539} y={168} w={146} h={50} label="Redis" sub={t("açık oturumlar", "open sessions")} />

    <Arrow d="M 437 98 L 437 162" />
    <ArrowLabel x={443} y={135} anchor="start">
      {t("okur", "reads")}
    </ArrowLabel>
    <Arrow d="M 612 98 L 612 162" />
    <ArrowLabel x={618} y={135} anchor="start">
      {t("yazar", "writes")}
    </ArrowLabel>

    {/* The decision travels back to the switch, which enforces it */}
    <Arrow d="M 612 218 L 612 272 L 262 272 L 262 98" accent />
    <ArrowLabel x={437} y={265} accent>
      {t("Access-Accept — VLAN ataması", "Access-Accept — VLAN assignment")}
    </ArrowLabel>

    <ArrowLabel x={14} y={302} anchor="start">
      {t("RFC 2865 / 2866 · 35 birim testi", "RFC 2865 / 2866 · 35 unit tests")}
    </ArrowLabel>
  </Figure>
);

/* ── AutoHeal ───────────────────────────────────────────────────
   Claim: the loop only exits when the test passes again.
   ───────────────────────────────────────────────────────────── */

const autoHeal: Draw = (t) => (
  <Figure
    width={700}
    height={300}
    label={t(
      "Kırılan bir testin LLM ile onarıldığı kapalı döngü",
      "The closed loop that repairs a broken test with an LLM",
    )}
    caption={t(
      "Döngü ancak test yeniden yeşile döndüğünde sonlanır. LLM'in önerisi doğrudan kabul edilmez; yama uygulanır ve test tekrar koşturularak doğrulanır.",
      "The loop only exits once the test is green again. The model's suggestion is never taken on trust — the patch is applied and the test is re-run to prove it.",
    )}
  >
    <Step x={14} y={30} w={150} h={58} n={1} label={t("Test kırılır", "Test breaks")} sub="Playwright" accent />
    <Step x={196} y={30} w={150} h={58} n={2} label={t("Sayfa kaydedilir", "Page captured")} sub={t("DOM anlık görüntüsü", "DOM snapshot")} />
    <Step x={378} y={30} w={150} h={58} n={3} label={t("Bağlam derlenir", "Context assembled")} sub={t("hata + seçici", "error + selector")} />
    <Step x={560} y={30} w={126} h={58} n={4} label={t("Modele sorulur", "Model asked")} sub="OpenAI · Ollama" />

    <Arrow d="M 164 59 L 190 59" />
    <Arrow d="M 346 59 L 372 59" />
    <Arrow d="M 528 59 L 554 59" />

    <Arrow d="M 623 88 L 623 150" />
    <ArrowLabel x={630} y={122} anchor="start">
      {t("yama önerir", "suggests a patch")}
    </ArrowLabel>

    <Step x={536} y={150} w={150} h={58} n={5} label={t("Yama uygulanır", "Patch applied")} sub="ts-morph · AST" />
    <Step x={300} y={150} w={168} h={58} n={6} label={t("Test yeniden koşar", "Test re-runs")} />
    <Step x={64} y={150} w={168} h={58} n={7} label={t("Yeşilse biter", "Green means done")} accent />

    <Arrow d="M 530 179 L 474 179" />
    <Arrow d="M 294 179 L 238 179" />
    <ArrowLabel x={266} y={172}>
      {t("geçti mi?", "did it pass?")}
    </ArrowLabel>

    {/* Still red: go round again */}
    <Arrow d="M 148 208 L 148 262 L 623 262 L 623 214" dashed />
    <ArrowLabel x={385} y={255}>
      {t("hâlâ kırıksa döngü baştan başlar", "still red — the loop starts over")}
    </ArrowLabel>
  </Figure>
);

/* ── NAC Gap Analyzer ───────────────────────────────────────────
   Claim: you find out what a NAC would block without installing one.
   ───────────────────────────────────────────────────────────── */

const nacGapAnalyzer: Draw = (t) => {
  const tiers = [
    { y: 26, label: t("Yüksek risk", "High risk"), sub: t("engellenirdi", "would be blocked"), accent: true },
    { y: 100, label: t("Orta risk", "Medium risk"), sub: t("karantinaya alınırdı", "would be quarantined"), accent: false },
    { y: 174, label: t("Düşük risk", "Low risk"), sub: t("geçerdi", "would pass"), accent: false },
  ];

  return (
    <Figure
      width={860}
      height={270}
      label={t(
        "Ağın taranıp her cihazın risk seviyesine göre sınıflandırılması ve politika simülasyonu",
        "Scanning the network, sorting each device by risk, and simulating the policy",
      )}
      caption={t(
        "Hiçbir NAC kurulmaz. Araç ağı tarar, cihazları risk seviyesine ayırır ve gerçek bir NAC'ın her birine ne yapacağını rapor olarak yazar.",
        "No NAC is installed. The tool scans the network, sorts devices by risk, and writes up what a real NAC would have done to each one.",
      )}
    >
      <Step x={14} y={100} w={140} h={58} n={1} label={t("Ağ aralığı", "Network range")} sub="CIDR" />
      <Step x={188} y={100} w={140} h={58} n={2} label={t("Tarama", "Scan")} sub="ARP · port · mDNS" />
      <Step x={362} y={100} w={150} h={58} n={3} label={t("Parmak izi", "Fingerprint")} sub={t("cihaz türü", "device type")} />

      <Arrow d="M 154 129 L 182 129" />
      <Arrow d="M 328 129 L 356 129" />

      {tiers.map((tier, index) => (
        <g key={tier.label}>
          <Step
            x={556}
            y={tier.y}
            w={152}
            h={58}
            n={4 + index}
            label={tier.label}
            sub={tier.sub}
            accent={tier.accent}
          />
          <Arrow
            d={`M 512 129 C 534 129, 534 ${tier.y + 29}, 550 ${tier.y + 29}`}
            accent={tier.accent}
          />
          <Arrow
            d={`M 708 ${tier.y + 29} C 726 ${tier.y + 29}, 726 129, 742 129`}
            accent={tier.accent}
          />
        </g>
      ))}

      <Step x={748} y={100} w={100} h={58} n={7} label={t("PDF rapor", "PDF report")} />
    </Figure>
  );
};

/* ── eQualiter ──────────────────────────────────────────────────
   Claim: the gap between two fingers is the volume.
   ───────────────────────────────────────────────────────────── */

const equaliter: Draw = (t) => (
  <Figure
    width={700}
    height={250}
    label={t(
      "Kamera görüntüsünün el hareketine, el hareketinin ses seviyesine dönüşmesi",
      "Turning a camera frame into a hand gesture, and the gesture into a volume level",
    )}
    caption={t(
      "Ölçülen tek şey başparmak ile işaret parmağı arasındaki mesafe. O mesafe doğrudan 0–100 arası ses seviyesine eşlenir, yani parmaklarını açıp kapatarak sesi ayarlarsın.",
      "The only thing measured is the gap between thumb and index finger. That distance maps straight onto a 0–100 volume, so opening and closing your fingers is the dial.",
    )}
  >
    <Step x={14} y={30} w={140} h={58} n={1} label={t("Kamera", "Camera")} sub="30 fps" />
    <Step x={188} y={30} w={160} h={58} n={2} label="MediaPipe" sub={t("21 el noktası", "21 hand landmarks")} />
    <Step x={382} y={30} w={140} h={58} n={3} label="OpenCV" sub={t("kareyi işler", "processes the frame")} />
    <Step x={556} y={30} w={130} h={58} n={5} label={t("Ses seviyesi", "System volume")} accent />

    <Arrow d="M 154 59 L 182 59" />
    <Arrow d="M 348 59 L 376 59" />

    {/* The measurement that does the actual work */}
    <Arrow d="M 452 88 L 452 122" />
    <ArrowLabel x={458} y={112} anchor="start">
      {t("ölçer", "measures")}
    </ArrowLabel>
    <Step
      x={318}
      y={128}
      w={268}
      h={58}
      n={4}
      label={t("Parmak arası mesafe ölçülür", "Finger gap measured")}
      sub={t("başparmak ↔ işaret parmağı", "thumb ↔ index finger")}
      accent
    />
    <Arrow d="M 586 157 L 621 157 L 621 92" accent />
    <ArrowLabel x={628} y={128} anchor="start" accent>
      0 → 100
    </ArrowLabel>

    <ArrowLabel x={14} y={240} anchor="start">
      {t("Kare işleme C++ ile hızlandırıldı", "Frame processing accelerated in C++")}
    </ArrowLabel>
  </Figure>
);

/* ── WhatsControl ───────────────────────────────────────────────
   Claim: a WhatsApp message becomes a button press on the TV.
   ───────────────────────────────────────────────────────────── */

const whatsControl: Draw = (t) => (
  <Figure
    width={700}
    height={250}
    label={t(
      "WhatsApp mesajının televizyonda bir tuş basışına dönüşmesi",
      "A WhatsApp message becoming a button press on the TV",
    )}
    caption={t(
      "Mesaj bir komuta çevrilir ve ADB üzerinden televizyona tuş basışı olarak gönderilir. Tanınmayan mesajlar sessizce elenir, yani rastgele bir yazı televizyonu sürmez.",
      "The message is turned into a command and sent to the TV over ADB as a key press. Anything unrecognised is dropped, so a stray message can't drive the television.",
    )}
  >
    <Step x={14} y={30} w={150} h={58} n={1} label="WhatsApp Web" sub={t("mesaj gelir", "message arrives")} />
    <Step x={198} y={30} w={150} h={58} n={2} label="Selenium" sub={t("mesajı okur", "reads the message")} />
    <Step x={382} y={30} w={160} h={58} n={3} label={t("Komut çözümlenir", "Command parsed")} />
    <Step x={576} y={30} w={110} h={58} n={4} label="Mi Box" sub="ADB" accent />

    <Arrow d="M 164 59 L 192 59" />
    <Arrow d="M 348 59 L 376 59" />
    <Arrow d="M 542 59 L 570 59" accent />
    <ArrowLabel x={556} y={22} accent>
      shell input keyevent
    </ArrowLabel>

    <Arrow d="M 462 88 L 462 138" dashed />
    <Note x={352} y={138} w={220} h={50} label={t("Tanınmayan mesaj elenir", "Unknown message dropped")} />

    <ArrowLabel x={14} y={240} anchor="start">
      {t("Uzaktan kumandayı kaybettiğim için yazdım", "Written because I lost the remote")}
    </ArrowLabel>
  </Figure>
);

const SCHEMATICS: Record<SchematicId, Draw> = {
  "nac-system": nacSystem,
  autoheal: autoHeal,
  "nac-gap-analyzer": nacGapAnalyzer,
  equaliter: equaliter,
  whatscontrol: whatsControl,
};

export default function Schematic({ id, locale }: { id: SchematicId; locale: Locale }) {
  const draw = SCHEMATICS[id];
  if (!draw) return null;
  return draw(localize(locale));
}
