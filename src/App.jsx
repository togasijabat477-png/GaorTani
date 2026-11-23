import { useMemo, useState } from 'react'
import {
  LayoutDashboard, ChartNoAxesCombined, Mic, Sprout, UserRound, Settings,
  Bell, Search, Plus, Sun, CloudSun, Droplets, Thermometer, Leaf,
  Pencil, Trash2, ChevronRight, Menu, X, Download, CalendarDays,
  CheckCircle2, CircleAlert, Volume2
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { farmData, chartData } from './data'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analysis', label: 'Analisis Data', icon: ChartNoAxesCombined },
  { id: 'voice', label: 'Kontrol Suara', icon: Mic },
  { id: 'farm', label: 'Data Pertanian', icon: Sprout },
  { id: 'profile', label: 'Profil', icon: UserRound },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
]

function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <>
      {open && <button className="overlay" onClick={() => setOpen(false)} aria-label="Tutup menu" />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand"><div className="brand-icon"><Sprout size={21} /></div><strong>GaorTani</strong><button className="close-menu" onClick={() => setOpen(false)}><X size={20}/></button></div>
        <nav>
          <p>MENU UTAMA</p>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={page === id ? 'nav-active' : ''} onClick={() => { setPage(id); setOpen(false) }}>
              <Icon size={19}/><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">YM</div><div><strong>Yuda Mahendra</strong><span>Administrator</span></div>
        </div>
      </aside>
    </>
  )
}

function Header({ title, setOpen }) {
  return (
    <header className="header">
      <div className="header-title"><button className="menu-button" onClick={() => setOpen(true)}><Menu size={22}/></button><div><span>Selasa, 24 November 2026</span><h1>{title}</h1></div></div>
      <div className="header-actions"><button className="search-button"><Search size={18}/></button><button className="notification-button"><Bell size={19}/><i /></button><div className="header-avatar">YM</div></div>
    </header>
  )
}

function StatCard({ icon: Icon, label, value, detail, tone }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={21}/></div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></article>
}

function Dashboard({ setPage }) {
  return (
    <div className="dashboard-grid">
      <section className="welcome-card">
        <div><span>Ringkasan Pertanian</span><h2>Selamat pagi, Yuda</h2><p>Pantau perkembangan lahan dan hasil panen Anda hari ini.</p></div>
        <div className="field-illustration"><div className="hill h1"/><div className="hill h2"/><Sprout size={54}/></div>
      </section>
      <section className="stats-row">
        <StatCard icon={Sprout} label="Lahan Aktif" value="12" detail="+2 bulan ini" tone="green"/>
        <StatCard icon={ChartNoAxesCombined} label="Panen Total" value="38.6 ton" detail="+12.4% vs lalu" tone="blue"/>
        <StatCard icon={Droplets} label="Lembap Rata-rata" value="68%" detail="Kondisi optimal" tone="cyan"/>
      </section>
      <section className="card chart-card">
        <div className="card-head"><div><h3>Produktivitas Panen</h3><p>Hasil panen 7 bulan terakhir</p></div><button>2026 <ChevronRight size={14}/></button></div>
        <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}><defs><linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16875a" stopOpacity={0.22}/><stop offset="100%" stopColor="#16875a" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf1ee"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill:'#8a9690' }}/><YAxis axisLine={false} tickLine={false} tick={{ fontSize:11, fill:'#8a9690' }}/><Tooltip/><Area type="monotone" dataKey="result" stroke="#16875a" strokeWidth={3} fill="url(#greenArea)"/></AreaChart></ResponsiveContainer></div>
      </section>
      <section className="card weather-card">
        <div className="card-head"><div><h3>Cuaca Hari Ini</h3><p>Bandung, Jawa Barat</p></div><CloudSun size={22}/></div>
        <div className="weather-now"><div className="weather-sun"><Sun size={44}/></div><div><strong>28°</strong><span>Cerah Berawan</span></div></div>
        <div className="weather-details"><div><Droplets size={16}/><span>Lembap</span><strong>72%</strong></div><div><Thermometer size={16}/><span>Suhu</span><strong>28°C</strong></div><div><Leaf size={16}/><span>Angin</span><strong>8 km/j</strong></div></div>
      </section>
      <section className="card activity-card">
        <div className="card-head"><div><h3>Aktivitas Terbaru</h3><p>Catatan operasional lahan</p></div><button onClick={() => setPage('farm')}>Lihat semua</button></div>
        <div className="activity-list">
          <div><span className="activity-dot green-dot"><CheckCircle2 size={16}/></span><p><strong>Pemupukan selesai</strong><small>Blok A · Padi Inpari 32 · 2 jam lalu</small></p><b>Selesai</b></div>
          <div><span className="activity-dot yellow-dot"><CircleAlert size={16}/></span><p><strong>Pemeriksaan hama dijadwalkan</strong><small>Greenhouse C · Besok, 07:00 WIB</small></p><b className="pending">Segera</b></div>
          <div><span className="activity-dot blue-dot"><Droplets size={16}/></span><p><strong>Sistem irigasi aktif</strong><small>Blok B · 4 jam lalu</small></p><b>Selesai</b></div>
        </div>
      </section>
    </div>
  )
}

function Analysis() {
  const [period, setPeriod] = useState('7 bulan')
  return (
    <div className="page-grid">
      <section className="card analysis-main">
        <div className="card-head"><div><h3>Grafik Produksi Pertanian</h3><p>Analisis hasil panen berdasarkan periode</p></div><select value={period} onChange={e => setPeriod(e.target.value)}><option>7 bulan</option><option>6 bulan</option><option>3 bulan</option></select></div>
        <div className="large-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="analysisArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16875a" stopOpacity={0.25}/><stop offset="100%" stopColor="#16875a" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="result" stroke="#16875a" strokeWidth={3} fill="url(#analysisArea)"/></AreaChart></ResponsiveContainer></div>
        <div className="analysis-summary"><div><span>Rata-rata hasil</span><strong>79.0 ton</strong></div><div><span>Pertumbuhan</span><strong className="positive">+35.3%</strong></div><div><span>Efisiensi lahan</span><strong>92.4%</strong></div></div>
      </section>
      <section className="card data-table-card">
        <div className="card-head"><div><h3>Hasil Analisis</h3><p>Ringkasan data pertanian terkini</p></div><button className="export-button"><Download size={15}/> Ekspor</button></div>
        <div className="table-wrap"><table><thead><tr><th>Kategori</th><th>Lahan</th><th>Produksi</th><th>Status</th></tr></thead><tbody>{farmData.map(row => <tr key={row.id}><td><strong>{row.crop}</strong></td><td>{row.land}</td><td>{row.harvest}</td><td><span className={`status ${row.status === 'Sehat' ? 'healthy' : 'warning'}`}>{row.status}</span></td></tr>)}</tbody></table></div>
      </section>
    </div>
  )
}

function Voice() {
  const [listening, setListening] = useState(false)
  const [result, setResult] = useState('Belum ada perintah')
  const commands = ['Tampilkan status lahan', 'Berapa hasil panen bulan ini?', 'Aktifkan sistem penyiraman', 'Buka laporan produksi']
  const toggle = () => {
    setListening(v => !v)
    if (!listening) setTimeout(() => { setListening(false); setResult('Tampilkan hasil panen bulan ini') }, 1800)
  }
  return (
    <div className="voice-layout">
      <section className="card voice-panel">
        <div className="mic-zone"><div className={`mic-ring ${listening ? 'listening' : ''}`}><button onClick={toggle} aria-label="Aktifkan mikrofon"><Mic size={31}/></button></div><h3>{listening ? 'Mendengarkan...' : 'Tekan untuk berbicara'}</h3><p>{listening ? 'Sebutan perintah Anda dengan jelas' : 'Gunakan perintah suara untuk mengelola pertanian'}</p></div>
        <div className="voice-result"><span>HASIL PENGENALAN SUARA</span><p><Volume2 size={17}/>{result}</p></div>
      </section>
      <section className="card command-card"><div className="card-head"><div><h3>Perintah Tersedia</h3><p>Contoh perintah yang dapat digunakan</p></div></div>{commands.map((item, i) => <button key={item} className="command-item"><span>0{i + 1}</span><strong>{item}</strong><ChevronRight size={16}/></button>)}</section>
    </div>
  )
}

function FarmData() {
  const [rows, setRows] = useState(farmData)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const filtered = useMemo(() =>
    rows.filter(row => `${row.crop} ${row.land}`.toLowerCase().includes(search.toLowerCase())),
  [rows, search])
  const addRow = () => { setRows(v => [...v, { id: Date.now(), crop: 'Kacang Tanah', land: 'Sawah Blok E', area: '1.2 ha', harvest: '3.1 ton', status: 'Sehat', date: '24 Nov 2026' }]); setShowForm(false) }
  return (
    <section className="card farm-card">
      <div className="card-head farm-head"><div><h3>Daftar Data Pertanian</h3><p>{rows.length} data lahan dan hasil panen</p></div><button className="primary-button" onClick={() => setShowForm(v => !v)}><Plus size={16}/> Tambah Data</button></div>
      {showForm && <div className="quick-form"><input placeholder="Nama tanaman"/><input placeholder="Lokasi lahan"/><input placeholder="Luas lahan"/><button onClick={addRow}>Simpan</button></div>}
      <div className="farm-tools"><div className="table-search"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari tanaman atau lahan"/></div><button><CalendarDays size={16}/> Semua tanggal</button></div>
      <div className="table-wrap farm-table"><table><thead><tr><th>Tanaman</th><th>Lahan</th><th>Luas</th><th>Hasil Panen</th><th>Kondisi</th><th>Aksi</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td><strong>{row.crop}</strong><small>{row.date}</small></td><td>{row.land}</td><td>{row.area}</td><td>{row.harvest}</td><td><span className={`status ${row.status === 'Sehat' ? 'healthy' : 'warning'}`}>{row.status}</span></td><td><div className="row-actions"><button title="Edit"><Pencil size={15}/></button><button title="Hapus" onClick={() => setRows(v => v.filter(r => r.id !== row.id))}><Trash2 size={15}/></button></div></td></tr>)}</tbody></table></div>
    </section>
  )
}

function Profile() {
  return (
    <div className="settings-layout">
      <section className="card profile-card"><div className="profile-cover"></div><div className="profile-info"><div className="profile-avatar">YM</div><div><h3>Yuda Mahendra</h3><p>yuda.mahendra@gaortani.id</p><span>Administrator Pertanian</span></div><button>Edit Profil</button></div><div className="profile-fields"><div><span>Nomor Telepon</span><strong>+62 812 3456 7890</strong></div><div><span>Lokasi</span><strong>Bandung, Jawa Barat</strong></div><div><span>Bergabung Sejak</span><strong>15 Januari 2024</strong></div></div></section>
    </div>
  )
}

function SettingsPage() {
  const [toggles, setToggles] = useState({ notification:true, email:false, dark:false })
  const toggle = key => setToggles(v => ({ ...v, [key]: !v[key] }))
  return (
    <div className="settings-layout">
      <section className="card setting-card"><div className="card-head"><div><h3>Pengaturan Notifikasi</h3><p>Atur pemberitahuan yang ingin Anda terima</p></div></div>
        {[['notification','Notifikasi aktivitas','Aktivitas dan pembaruan lahan'],['email','Pemberitahuan email','Ringkasan laporan harian'],['dark','Mode gelap','Sesuaikan tampilan aplikasi']].map(([key,title,desc]) => <div className="setting-row" key={key}><div><strong>{title}</strong><span>{desc}</span></div><button className={`switch ${toggles[key] ? 'on' : ''}`} onClick={() => toggle(key)}><i/></button></div>)}
      </section>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [open, setOpen] = useState(false)
  const titles = { dashboard:'Dashboard', analysis:'Analisis Data', voice:'Kontrol Suara', farm:'Data Pertanian', profile:'Profil Pengguna', settings:'Pengaturan' }
  const pages = { dashboard:<Dashboard setPage={setPage}/>, analysis:<Analysis/>, voice:<Voice/>, farm:<FarmData/>, profile:<Profile/>, settings:<SettingsPage/> }
  return <div className="app-shell"><Sidebar page={page} setPage={setPage} open={open} setOpen={setOpen}/><main className="main-area"><Header title={titles[page]} setOpen={setOpen}/><div className="page-content">{pages[page]}</div></main></div>
}
