import { motion } from 'motion/react';
import { BookOpen, Compass, ShieldCheck, Heart, ExternalLink, Award } from 'lucide-react';

const missionImage = new URL('../assets/images/mission.jpeg', import.meta.url).href;
const visionImage = new URL('../assets/images/vision.jpeg', import.meta.url).href;
const pastorImage = new URL('../assets/images/pastor.jpeg', import.meta.url).href;

export default function PageAbout() {
  const pillars = [
    {
      title: "Our Mission",
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      image: missionImage,
      description: "Our mission is to serve the Lord Jesus Christ, help others, and carry the Message of the Gospel to every nation, holding forth the Light of Christ to the world.",
      scriptures: [
        {
          ref: "Mark 16:15",
          text: "And he said unto them, Go ye into all the world, and preach the gospel to every creature."
        },
        {
          ref: "Romans 12:2",
          text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God."
        }
      ]
    },
    {
      title: "Our Vision",
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      image: visionImage,
      description: "To be a Church filled with the Light of Christ, preparing people for His coming through holiness, the preaching of the Gospel, and the power of the Holy Spirit.",
      scriptures: [
        {
          ref: "Ephesians 5:27",
          text: "That he might present it to himself a glorious church, not having spot, or wrinkle, or any such thing; but that it should be holy and without blemish."
        },
        {
          ref: "Matthew 24:28",
          text: "For wheresoever the carcase is, there will the eagles be gathered together."
        }
      ]
    }
  ];

  return (
    <div className="space-y-16">
      {/* Introduction Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4" id="about-intro">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">About the assembly</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
          Rooted in the Word & Guided by the Holy Spirit
        </h2>
        <p className="text-zinc-400 leading-relaxed font-sans text-base md:text-lg">
          Sikusi Believers-Message of the Hour Assemblies is located in Bungoma County on your way to Chwele.
          Founded in early 2020, our local assembly serves as a tabernacle of refuge, holding high the light of truth 
          for the Bride of Jesus Christ.
        </p>
      </section>

      {/* Main Grid: Pastor Bio / Core History */}
      <section className="grid md:grid-cols-12 gap-8 items-center" id="about-history">
        <div className="md:col-span-5 relative group rounded-2xl overflow-hidden aspect-[4/5] border border-zinc-800">
          <img
            src={pastorImage}
            alt="Pst. Maurice"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-flex items-center gap-1.5 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Award className="w-3.5 h-3.5" /> Shepherd of the Flock
            </div>
            <h4 className="text-xl font-serif font-bold text-white">Pst. Maurice</h4>
            <p className="text-amber-400 text-sm font-medium">Sikusi Believers Pastor</p>
          </div>
        </div>

        <div className="md:col-span-7 space-y-6">
          <h3 className="text-2xl font-serif font-bold text-white">Our Foundations</h3>
          <p className="text-zinc-400 leading-relaxed">
            We are true Christian believers and witnesses of the Gospel of the Lord Jesus Christ, based solely on the inspired teachings of the Holy Bible and the evening-time message presented by the Seventh Angel, <strong>Rev. William Marrion Branham</strong>.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Since beginning in early 2020, we have grown together under the shepherding of <strong>Pastor Maurice Wanyonyi</strong>, focusing on edification of the body of the Lord Jesus Christ, to bring the church to a living faith in Christ and for the glory of God. We provide a warm atmosphere of Christian hospitality for all seeking spiritual refuge.
          </p>

          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl flex gap-4 items-start">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Welcome fellowship with us</h4>
              <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                Now, we don't have any membership, we just have fellowship, see, because if we have membership then we bring the people, like to an organization, which we are strictly interdenominational, unorganized. Only one Thing to lead us, that's the Holy Spirit. And we believe that the Holy Spirit leads through our leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section: Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8" id="about-pillars">
        {pillars.map((pillar, idx) => (
          <div key={idx} className="bg-zinc-900/35 border border-zinc-800/80 rounded-3xl overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
              <img
                src={pillar.image}
                alt={pillar.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">{pillar.title}</h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-zinc-300 text-sm leading-relaxed">{pillar.description}</p>
              
              <div className="space-y-4 border-t border-zinc-800/60 pt-4">
                {pillar.scriptures.map((scrip, sIdx) => (
                  <div key={sIdx} className="space-y-1 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/40">
                    <span className="text-amber-400 text-xs font-semibold block">{scrip.ref}</span>
                    <p className="text-xs text-zinc-400 italic">"{scrip.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Voice of God Recordings Link */}
      <section className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto" id="about-vogr">
        <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-serif font-bold text-white">Voice Of God Recordings (VOGR)</h3>
          <p className="text-sm text-zinc-400">Search messages, spiritual transcripts, and global sermon archives</p>
        </div>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          We encourage all believers to utilize the tools of branham.org to study the Word in depth and read recorded transcripts.
        </p>
        <a
          href="https://branham.org/home"
          target="_blank"
          rel="noopener noreferrer"
          id="btn-open-vogr"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-600/15 cursor-pointer"
        >
          Open Website <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
