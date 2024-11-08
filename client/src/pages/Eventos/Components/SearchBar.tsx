import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SearchBarProps {
  eventType: string;
  setEventType: (value: string) => void;
  eventTime: string;
  setEventTime: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  eventTime,
  setEventTime,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleEvents = () => {
    if (location.pathname === '/eventos/meus_eventos') {
      navigate(`/eventos`);
    } else {
      navigate(`/eventos/meus_eventos`);
    }
  };

  const timeRanges = [
    { label: 'Manhã (08:00 - 12:00)', value: 'morning' },
    { label: 'Tarde (12:00 - 18:00)', value: 'afternoon' },
    { label: 'Noite (18:00 - 23:00)', value: 'evening' },
  ];

  return (
    <div className="search-bar">

      {/* Horário */}
      <div className="input-group">
        <label>Horário</label>
        <select 
          value={eventTime} 
          onChange={(e) => {
            setEventTime(e.target.value);
            console.log("Horário selecionado:", e.target.value);
          }}
        >
          <option value="">Selecione um horário</option>
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Data */}
      <div className="input-group">
        <label>Data</label>
        <div className="date-range">
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
          <span>À</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>
      </div>

      {/* Botões */}
      <button className="show-button" onClick={handleToggleEvents}>
        {location.pathname === '/eventos/meus_eventos' ? 'Mostrar Todos' : 'Mostrar Meus Eventos'}
      </button>

    </div>
  );
};

export default SearchBar;
