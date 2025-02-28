import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const DepartmentSelection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const text = "Enter the Register number of the student";
    let index = 0;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-UK';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);

    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 70);

    return () => {
      clearInterval(interval);
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    try {
      // Retrieve student list from sessionStorage
      const studentsList = JSON.parse(sessionStorage.getItem('studentsList') || '[]');
      console.log("Retrieved studentsList:", studentsList);

      // Convert user input to a number (if it's valid)
      const searchRegisterNo = Number(searchInput.trim());

      if (isNaN(searchRegisterNo)) {
        console.error("Invalid register number format.");
        navigate('/error', { state: { returnPath: '/department-selection' } });
        return;
      }

      // Filter students based on the register number
      const filteredStudents = studentsList.filter(student => 
        student.register_no === searchRegisterNo
      );

      console.log("Filtered Students:", filteredStudents);

      if (filteredStudents.length === 0) {
        navigate('/error', { state: { returnPath: '/department-selection' } });
        return;
      }

      // Store the filtered results in sessionStorage
      sessionStorage.setItem('filteredResults', JSON.stringify(filteredStudents));
      navigate('/results');
      
    } catch (error) {
      console.error('Error filtering by register number:', error);
      navigate('/error', { state: { returnPath: '/department-selection' } });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container flex flex-col items-center justify-center">
        <p className="mt-32 mb-8 text-[#2d336b] text-2xl font-bold text-balance whitespace-pre-line">
          {displayedText}
        </p>
        <div className="flex gap-2 w-full max-w-md px-4">
          <Input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter Register Number..."
            className="shadow-lg rounded-lg text-lg py-6"
          />
          <Button 
            id="searchRegisterBtn" 
            onClick={handleSearch} 
            className="bg-[#1D4ED8] hover:bg-[#1e40af] px-6 h-[50px]"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <Card className="rounded-t-[20px] border-b-0 h-[90px]">
          <div className="flex justify-around items-center mt-4">
            <button onClick={() => { window.speechSynthesis.cancel(); navigate('/confirmation'); }} className="border-0 bg-white">
              <ArrowLeft size={32} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentSelection;
