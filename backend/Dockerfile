FROM python:3.9

RUN mkdir /app

COPY *.py /app/

COPY requirements.txt /app/

WORKDIR /app

RUN pip install --no-cache-dir -r ./requirements.txt

EXPOSE 5000

ENTRYPOINT ["python", "main.py"]