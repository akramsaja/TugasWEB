const HTTP = require("http");
const url = require("url");
const {
    editData
} = require("./mahasiswa.js");
const port = 3000;
const database = require("./mahasiswa.js")

HTTP.createServer(function (req, res) {

    const {
        pathname,
        query
    } = url.parse(req.url, true);

    if (pathname == "/") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.write(`  
        <body style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
        <br>
        <h1 align="center"> Selamat Datang Di Web Kami</h1>
        <ul type="square" style="color: white;
        font-weight: bold;">
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'"href="/">Branda</a></li>
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'"href="/Kelompok">Kelompok</a></li>
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'"href="/Profil">Profil</a></li>
        </ul>
        `);
        res.end();
    } else if (pathname == "/Kelompok") {
        let {
            page
        } = query
        page = page || 0
        const offset = page * 70
        database.ambeMuami(offset).then(result => {

            res.writeHead(200, {
                "Content-Type": "text/html",
            });
            res.write(`
            <body style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
            <br>
            <h1 align="center"> Kelompok 4 </h1>
            <ul type="square">
            <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/">Branda</a></li>
            <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/Kelompok">Kelompok</a></li>
            <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/Profil">Profil</a></li>
            </ul>
            <h3 class="list" style="display:flex;flex:1;flex-direction:column;gap:5%;width:max-content;height:max-content;margin:auto;">
            <br>
            <P><a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/Kelompok?page=0">1</a>
            <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/Kelompok?page=1">2</a></P>
            <table cellspacing="0" cellpadding="3" align="center" style="border: 2px solid #efefef; background: #364f6b; ">
            <br><br>
            <h2 align="center">  Tabel Daftar Mahasiswa </h2>
                    <tr align="center">
                    <th width="200px">Nama</th>
                    <th width="100px">NIM</th>
                    <th width="150px">Jenis Kelamin</th>
                    <th width="100px">Prodi</th>
                    <th width="100px">Angkatan</th>
                    <th width="210px">Alamat</th>
                    </tr>
                    </table>
            `);
            result.forEach((el) => {
                res.write(
                    `
                    <table  cellspacing="0" cellpadding="3" style="border: 2px solid #efefef; ">
                    <tr align="center">
                    <td width="200px"><a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href='/Anggota?nama=${el.nama}&nim=${el.nim}'>${el.nama}</a></td>
                    <td width="100px"><a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href='/Anggota?nama=${el.nama}&nim=${el.nim}'>${el.nim}</a></td>
                    <td width="150px"><a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href='/Anggota?nama=${el.nama}&nim=${el.jenis_kelamin}'>${el.jenis_kelamin}</a></td>
                    <td width="100px"><a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href='/Anggota?nama=${el.nama}&nim=${el.prodi}'>${el.prodi}</a></td>
                    <td width="100px"><a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href='/Anggota?nama=${el.nama}&nim=${el.angkatan}'>${el.angkatan}</a></td>
                    <td width="200px"><a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href='/Anggota?nama=${el.nama}&nim=${el.alamat}'>${el.alamat}</a></td>
                    </tr>
                    </table>
            `
                );
            });
            res.write("</h3>");
            res.end();
        }).catch(err => {
            console.log(err)
            res.writeHead(500, {
                'Content-Type': 'text/html'
            })
            res.end(`<h1>500 Internal Server Error</h1>`)
        })

    } else if (pathname == "/Profil") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.write(`
        <body style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
        <br>
        <h1 align="center"> Profil </h1>
        <ul type="square">
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b" onmouseleave="this.style.color = 'white'" href="/"&color=black&backcolor=cyan>Branda</a></li>
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/Kelompok"&color=black&backcolor=cyan>Kelompok</a></li>
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/Profil"&color=black&backcolor=cyan>Profil</a></li>
        </ul>
        <p align="center"> Kami dari kelompok 4 membuat web ini untuk menyelesaikan tugas yang telah diberikan </p>
        `);
        res.end();
    } else if (pathname == "/Mahasiswa") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });

        res.write(`
        <body style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
        <br>
        <h1 align="center"> Profil </h1>
        <ul type="square">
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b" onmouseleave="this.style.color = 'white'" href="/"&color=black&backcolor=cyan>Branda</a></li>
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/Kelompok"&color=black&backcolor=cyan>Kelompok</a></li>
        <li> <a style="color:white;text-decoration:none;" onmouseenter="this.style.color = '#364f6b'" onmouseleave="this.style.color = 'white'" href="/Profil"&color=black&backcolor=cyan>Profil</a></li>
        </ul>
        <p align="center"> Kami dari kelompok 4 membuat web ini untuk menyelesaikan tugas yang telah diberikan </p>
        `);
        res.end();
    } else if (pathname == "/Anggota") {

        const {
            nim
        } = query;

        if (nim == null || nim == "" || nim.length != 12) {
            res.writeHead(400, {
                "Content-Type": "text/html",
            });
            res.write(
                `<body align = "center"style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
        <br><br><br><br><br><br><br><br><br><br>
        <h1>400</h1>
        <h2>Query is empty</h2>
        <p>Mohon masukkan url yang benar</p> 
        `);
            res.end();
            return;
        }
        database.ambilDariNim(nim).then(data => {
            if (Object.keys(data).length == 0) {
                res.writeHead(404, {
                    "Content-Type": "text/html",
                });
                res.write(`<br><br><br><br><br><br><br><br><br><br>
        <body align= "center" style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
        <h1> 404</h1>
        <h2>Tidak menemukan url yang dimaksud</h2>
        <p>Mohon masukkan url yang benar</p>`);
                res.end();
                return
            }

            res.writeHead(200, {
                "Content-Type": "text/html",
            });
            console.log(nim);
            const foto = `https://simak.unismuh.ac.id/upload/mahasiswa/${nim}.jpg`;
            if (data.nilai == null) {
                data.nilai = {
                    nilaidosen1: 0,
                    nilaidosen2: 0,
                }
            }

            const nilaitotal = data.nilai.nilaidosen1 == null || data.nilai.nilaidosen2 == null ? "" : (Number.parseInt(data.nilai.nilaidosen1) + Number.parseInt(data.nilai.nilaidosen2)) / 2
            const hasilakhir = function () {
                if (nilaitotal == "") {
                    return ""
                }
                if (nilaitotal > 85) {
                    return "A"
                } else if (nilaitotal > 81) {
                    return "A-"
                } else if (nilaitotal > 76) {
                    return "B+"
                } else if (nilaitotal > 71) {
                    return "B"
                } else if (nilaitotal > 65) {
                    return "B-"
                } else if (nilaitotal > 61) {
                    return "C+"
                } else if (nilaitotal > 56) {
                    return "C"
                } else {
                    return "E"
                }
            }
            res.end(`
        <body align="center" style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
        <br>
        <div align="center" >
        <img  onclick="window.location.href = '${foto}' " width="300"   height="300" src="${foto}" alt="${foto}" style=" border-style: solid #3f72af; border-white: 1,2px; border-radius: 20px;"  />
        <br>
        <br>
        <table >
        <tr><td>Nama  </td>
        <td>= ${data.nama}</td></tr>
        <tr><td>NIM </td>
        <td>= ${data.nim}</td></tr>
        <tr><td>Jenis Kelamin</td>
        <td> = ${data.jenis_kelamin}</td></tr>
        <tr><td>Prodi</td>
        <td> = ${data.prodi}</td></tr>
        <tr><td>Angkatan</td>
        <td> = ${data.angkatan}</td></tr>
        <tr><td>Alamat</td>
        <td> = ${data.alamat}</td></tr>
        <tr><td>Kelompok</td>
        <td> = ${data.kelompok}</td></tr>
        <tr><td>Kelas</td>
        <td> = ${data.kelas}</td></tr>
        <tr><td>Nilai Dosen 1</td>
        <td> = ${data.nilai.nilaidosen1==null?"":data.nilai.nilaidosen1}</td></tr>
        <tr><td>Nilai Dosen 2</td>
        <td> = ${data.nilai.nilaidosen2==null?"":data.nilai.nilaidosen2}</td></tr>
        <tr><td>Nilai Total</td>
        <td> = ${nilaitotal} atau ${hasilakhir()}</td></tr>

        </table> 
        <br>
        <br>
        
        <h2>Edit</h2>
        <table>
        <form method="POST" action="/edit?nim=${data.nim}"> 
        <tbody>
        <tr><td>
        <label for="nama" > Nama  </label></td><td>=
        <input type="text" id="nama" name="nama" value="${data.nama}" required>
        </td>
        </tr>
        <tr><td><label for="nim" > NIM  </label></td><td>=
        <input type="text" name="nim" id="nim" value="${data.nim}" required>
        </td></tr>
        <tr>
        <td>
        <label for="nama" > Jenis Kelamin  </label></td><td>=
        <input type="text" name="jenis_kelamin" id="jenis_kelamin"value="${data.jenis_kelamin}" required>
        </td></tr>
        <tr><td>
        <label for="nama" > Prodi  </label></td><td>=
        <input type="text" name="prodi" id="prodi"value="${data.prodi}" required>
        </td></tr>
        <tr><td>
        <label for="nama" > Angkatan  </label></td><td>=
        <input type="text" name="angkatan" id="angkatan" value="${data.angkatan}" required>
        </td></tr>
        <tr><td>
        <label for="nama"> Alamat  </label></td><td>=
        <input type="text" name="alamat" id="alamat"value="${data.alamat}" required>
        </td></tr>
        <tr><td>
        <label for="nama"> Kelompok  </label></td><td>=
        <input type="text" name="kelompok" id="kelompok"value="${data.kelompok}" required>
        </td></tr>
        <tr><td>
        <label for="nama"> Kelas </label></td><td>=
        <input type="text" name="kelas" id="kelas"value="${data.kelas}" required>
        </td></tr>
        <tr><td>
        <input type="submit" style="background: #3f72af;
        border-radius: 10px;
        margin-top: 20px;
        margin-left:100%;
        border:0px;
        padding: 10px 20px 15px 20px;
        color: #FFFFFF;
        cursor: pointer;
        font-weight: bold;value="submit">
        </td></tr>
        </tbody>
        </form> 
        </table>
        <br><br>

        <h2>Nilai</h2>
        <form method="POST" action="/edit?nim=${data.nim}">
        <table>
        <tbody>
        <tr><td>
        <label for="name"> Nilai Dosen 1 </label>=
        <input type="number" name="nilaidosen1" value="${data.nilai.nilaidosen1}" >
        </td></tr>
        <tr><td>
        <label for="name"> Nilai Dosen 2 </label>=
        <input type="number" name="nilaidosen2" value="${data.nilai.nilaidosen2}" >
        </td></tr>
        <tr><td><input type="submit" style="background: #3f72af;
        border-radius: 10px;
        margin-top: 20px;
        margin-left:35%;
        border:0px;
        padding: 10px 20px 15px 20px;
        color: #FFFFFF;
        cursor: pointer;
        font-weight: bold;value="submit"> </td></tr>
        
        </tbody></form></table>
<br><br><br>

        <p>  <a style="background: #3f72af;
        border-radius: 20px;
        margin-top: 20px;
        padding: 15px 20px 15px 20px;
        color: #FFFFFF;
        cursor: pointer;
        font-weight: bold;" href="/Kelompok">kembali</a> </p>
        </div>
        
        `);

        }).catch(err => {
            console.log(err)
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
            res.end(`<br><br><br><br><br><br><br><br><br><br>
            <body align= "center" style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
            <h1> 404</h1>
            <h2>Tidak menemukan url yang dimaksud</h2>
            <p>Mohon masukkan url yang benar</p>`)
        })
    } else if (pathname == "/edit") {
        const {
            nim
        } = query
        if (nim == null || nim == "") {
            res.writeHead(400, {
                "Content-Type": "text/html",
            });
            res.end(
                `<body align = "center"style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
        <br><br><br><br><br><br><br><br><br><br>
        <h1>400</h1>
        <h2>Query is empty</h2>
        <p>Mohon masukkan url yang benar</p> 
        `);
            return;
        }
        let chunks = ""
        req.on('data', (chunk) => {
            chunks += chunk.toString();
        })
        req.on('end', () => {
            const data = new URLSearchParams(chunks)
            const result = {}
            for (const [key, value] of data.entries()) {
                result[key] = value
            }
            const hasil = result.nim == null ? {
                nilai: result

            } : result

            database.editData(nim, hasil).then(result2 => {
                if (result2 == true) {
                    res.writeHead(200, {
                        "Content-Type": "text/html",
                    });
                    res.end(`<br><br><br><br><br><br><br><br><br><br>
                <body align= "center" style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
                <h2>Berhasil mengedit</h2>
                <script>setTimeout(() => {
                    window.location.href="/Anggota?nim=${result.nim == null ? nim : result.nim}"
                }, 1000)</script>
                `);
                    return
                }
                res.writeHead(404, {
                    "Content-Type": "text/html",
                });
                res.end(`<br><br><br><br><br><br><br><br><br><br>
                <body align= "center" style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
                <h1> 404</h1>
                <h2>Gagal mengedit</h2>`);

            })
        })
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html",
        });
        res.write(`<br><br><br><br><br><br><br><br><br><br>
        <body align= "center" style="background-color:rgb(71, 138, 150);color:white;font-family:arial;font-weight: bold;">
        <h1> 404</h1>
        <h2>Tidak menemukan url yang dimaksud</h2>
        <p>Mohon masukkan url yang benar</p>`);
        res.end();
    }
    console.log(pathname);
}).listen(port);

console.log("Server berjalan di port  http://localhost:3000/");