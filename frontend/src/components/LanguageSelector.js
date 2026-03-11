import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LanguageSelector({ value, onChange }) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get(`${API}/languages`);
        setLanguages(res.data.languages);
      } catch (e) {
        console.error("Failed to fetch languages", e);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <div className="flex items-center gap-2" data-testid="language-selector">
      <Globe className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="w-[180px] h-9 text-sm bg-white border-slate-200"
          data-testid="language-select-trigger"
        >
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent data-testid="language-select-content">
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              data-testid={`language-option-${lang.code}`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{lang.name}</span>
                <span className="text-xs text-slate-400">({lang.native})</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
